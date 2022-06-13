import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { toast } from 'react-toastify'
import { SERIALIZE_API } from 'constants/url'
import axios from 'axios'
import moment from 'moment'
import * as actions from './actions'
import { encodeValue } from '../../utils/calculations'

const prepareData = payload => {
  let data = { skip: payload.skip, take: payload.take, order: payload.order }
  if (payload.query) {
    const filterQuery = payload.query
    let query = ''
    Object.keys(payload.query).forEach(el => {
      if (el === 'ts') {
        const { startDate } = filterQuery[el]
        const { endDate } = filterQuery[el]
        query = `${el}=gt=${moment(startDate)
          .utc()
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .format()};${el}=le=${moment(endDate)
          .utc()
          .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
          .format()};`
      } else {
        const encodedValue = encodeValue(filterQuery[el].value)
        query += `${el}=${filterQuery[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
      }
    })
    const op =
      (Object.keys(payload.query) && Object.keys(payload.query).length > 1) || (query && query.includes('ts'))
        ? 'AND'
        : ''
    data = { ...data, query, ...(!op ? null : { op }) }
  }
  return data
}

export function* inventoryGetItems({ payload }) {
  try {
    const data = prepareData(payload)
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/packaging/container/inventory/get`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.inventoryPostSuccess(response.data))
  } catch (error) {
    yield put(actions.inventoryPostFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export function* inventoryGetItemsExport({ payload }) {
  try {
    const data = prepareData(payload)
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/packaging/container/inventory/get`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.inventoryPostSuccessExport(response.data))
  } catch (error) {
    yield put(actions.inventoryPostFailExport(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.INVENTORY_POST, inventoryGetItems)
  yield takeEvery(actions.INVENTORY_POST_EXPORT, inventoryGetItemsExport)
}
