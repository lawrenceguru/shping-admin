import { select, takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { fromIdentity } from 'store/selectors'
import { SERIALIZE_API } from 'constants/url'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* getSerializationTasks({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const responce = yield call(() =>
      axios.get(`${SERIALIZE_API}/tasks`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    const { data } = yield call(() =>
      axios.get(`${SERIALIZE_API}/tasks${payload ? `?limit=${payload.limit}&offset=${payload.offset}` : ''}`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    yield put(actions.serializationGetItemsLengthSuccess(responce.data))
    yield put(actions.serializationGetItemsSuccess(data))
  } catch (error) {
    yield put(actions.serializationGetItemsFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export function* getSSCCTasksStatus() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${SERIALIZE_API}/packaging/tasks`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.serializeGetSSCCTasksStatusSuccess((data && data.tasks) || []))
  } catch (error) {
    yield put(actions.serializeGetSSCCTasksStatusFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.GET_SERIALIZATION, getSerializationTasks)
  yield takeEvery(actions.SERIALIZE_GET_SSCC_TASKS_STATUS, getSSCCTasksStatus)
}
