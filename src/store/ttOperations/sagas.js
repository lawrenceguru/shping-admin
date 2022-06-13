import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { fromIdentity } from 'store/selectors'
import { SERIALIZE_API } from 'constants/url'
import { toast } from 'react-toastify'
import moment from 'moment'
import * as actions from './actions'

export function* getOperations({ payload }) {
  try {
    let data = { sort_order: payload.sort_order, limit: payload.limit }
    if (payload.userFilters) {
      Object.keys(payload.userFilters).map(el => {
        if (el === 'ts') {
          return (data = {
            ...data,
            after_time: moment(payload.userFilters[el].startDate)
              .utc()
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .format(),
            before_time: moment(payload.userFilters[el].endDate)
              .utc()
              .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
              .format()
          })
        }
        return (data = {
          ...data,
          [el]: payload.userFilters[el].value
        })
      })
    }
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/track_trace/get_log`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.operationsGetItemsSuccess(response.data))
  } catch (error) {
    yield put(actions.operationsGetItemsFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.GET_OPERATIONS, getOperations)
}
