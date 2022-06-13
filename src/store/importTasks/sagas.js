import axios from 'axios'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { IDENTITY_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'

export function* getImportParticipants() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${IDENTITY_API}/participants/import`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.importTasksGetImportParticipantsSuccess(data || []))
  } catch (error) {
    yield put(actions.importTasksGetImportParticipantsFail(error))
  }
}

export function* getImportParticipantHistory({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${IDENTITY_API}/participants/import/${payload}/history`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(
      actions.importTasksGetImportParticipantHistorySuccess(
        (data && data.length > 0 && data.sort((a, b) => a.start_ts > b.start_ts)) || []
      )
    )
  } catch (error) {
    yield put(actions.importTasksGetImportParticipantHistoryFail(error))
  }
}

export default function*() {
  yield takeLatest(actions.GET_IMPORT_PARTICIPANTS, getImportParticipants)
  yield takeLatest(actions.GET_IMPORT_PARTICIPANT_HISTORY, getImportParticipantHistory)
}
