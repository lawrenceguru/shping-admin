import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { PARTICIPANT_API, PAYMENTS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'

export function* getParticipantProfile() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PARTICIPANT_API}/users/participant`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.participantGetParticipantProfileSuccess(data))
  } catch (error) {
    yield put(actions.participantGetParticipantProfileFail(error))
  }
}

export function* getParticipantDeposit() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PAYMENTS_API}/participants/deposit/ethereum`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.participantGetParticipantDepositSuccess(data))
  } catch (error) {
    yield put(actions.participantGetParticipantDepositFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_PARTICIPANT_PROFILE, getParticipantProfile)
  yield takeEvery(actions.GET_PARTICIPANT_DEPOSIT, getParticipantDeposit)
}
