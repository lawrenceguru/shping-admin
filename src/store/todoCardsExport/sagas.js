import { call, put, select, takeEvery } from 'redux-saga/effects'
import { TODO_CARDS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from './actions'

// eslint-disable-next-line camelcase
export function* getTodoExportTasks({ payload: { delivery_id, from_time, to_time } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${TODO_CARDS_API}/cards/approved/export/tasks`,
      {
        delivery_id,
        from_time,
        to_time
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.todoGetTodoExportTasksSuccess())
    yield put(actions.todoGetStatusAllExportTasks())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoGetTodoExportTasksFail(error))
  }
}

export function* getStatusAllExportTasks() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${TODO_CARDS_API}/cards/approved/export/tasks`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.todoGetStatusAllExportTasksSuccess(data.tasks))
  } catch (error) {
    yield put(actions.todoGetStatusAllExportTasksFail(error))
  }
}

// eslint-disable-next-line camelcase
export function* getStatusExportTask({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    // eslint-disable-next-line camelcase
    const { data } = yield call(axios.get, `${TODO_CARDS_API}/cards/approved/export/tasks/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.todoGetStatusExportTaskSuccess(data))
  } catch (error) {
    yield put(actions.todoGetStatusExportTaskFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_TODO_EXPORT_TASKS, getTodoExportTasks)
  yield takeEvery(actions.GET_STATUS_ALL_EXPORT_TASKS, getStatusAllExportTasks)
  yield takeEvery(actions.GET_STATUS_EXPORT_TASK, getStatusExportTask)
}
