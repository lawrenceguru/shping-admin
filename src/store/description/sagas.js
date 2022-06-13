/* eslint-disable indent */
import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { DESCRIPTION_API, INDEX_API } from 'constants/url'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import * as actions from './actions'
import { getGtin } from '../gtin/actions'

export function* updateSources(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { sources, id, isNewProduct } = payload.payload
    const response = yield call(
      axios.post,
      `${DESCRIPTION_API}/description`,
      { sources, id },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )
    if (response) {
      yield call(axios, {
        method: 'post',
        url: `${INDEX_API}/clear_cache`,
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      })
      yield put(actions.descriptionUpdateSourcesSuccess({ data: response.data }))
      yield put(getGtin({ id }))
      toast.success(isNewProduct ? 'The product was successfully created' : 'Data source was successfully updated')
    }
  } catch (error) {
    yield put(actions.descriptionUpdateSourcesFail(error))
    if (error.response && error.response.data && error.response.data.error_id) {
      toast.error(intl.get(`serverErrors.${error.response.data.error_id}`) || error.response.data.error)
    } else {
      toast.error(`Error at ${error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.UPDATE_SOURCES, updateSources)
}
