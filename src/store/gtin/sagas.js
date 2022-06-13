/* eslint-disable indent */
import axios from 'axios'
import { call, put, select, takeEvery, delay } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { DESCRIPTION_API } from 'constants/url'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as actions from './actions'
import { getProductsList } from '../products/actions'
import { descriptionUpdateSources } from '../description/actions'

export function* getGtin({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { id } = payload
    yield put(actions.getGtinStart())
    const response = yield call(axios.get, `${DESCRIPTION_API}/description?id=${id}`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      const { data } = response
      yield put(actions.getGtinSuccess({ data }))
    }
  } catch (error) {
    yield put(actions.getGtinFail(error))
    yield delay(1000)
    yield put(actions.getGtinEnd())
  }
}

export function* deleteGtin({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { id } = payload
    const response = yield call(axios.delete, `${DESCRIPTION_API}/gtins/${id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })

    if (response.status === 204) {
      yield put(actions.deleteGtinSuccess())
      yield put(getProductsList(payload))
      toast.success('Product is successfully deleted')
    }
  } catch (error) {
    toast.error('Delete GTIN error')
    yield put(actions.deleteGtinFail(error))
  }
}

export function* updateGtin({ payload }) {
  const { id, isNewProduct, sources } = payload
  try {
    const ticket = yield select(fromIdentity.getTicket)

    let url = `${DESCRIPTION_API}/gtins/${id}`

    let method = 'put'

    if (isNewProduct) {
      url = `${DESCRIPTION_API}/gtins`
      method = 'post'
    }
    // eslint-disable-next-line no-param-reassign
    delete payload.isNewProduct
    // eslint-disable-next-line no-param-reassign
    delete payload.sources
    const response = yield call(axios, {
      method,
      url,
      data: payload,
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      yield put(descriptionUpdateSources({ sources, id, isNewProduct }))
    }
    if (response.status === 200 || response.status === 201) {
      yield put(actions.updateGtinSuccess({ data: response.data }))
    }
  } catch (error) {
    yield put(descriptionUpdateSources({ sources, id, isNewProduct }))
    yield put(actions.updateGtinFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.DELETE_GTIN, deleteGtin)
  yield takeEvery(actions.GET_GTIN, getGtin)
  yield takeEvery(actions.UPDATE_GTIN, updateGtin)
}
