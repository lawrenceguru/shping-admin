import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { PARTICIPANT_API, IDENTITY_API, CONTRIBUTORS_API } from 'constants/url'
import 'react-toastify/dist/ReactToastify.css'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* getMyTeam() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${PARTICIPANT_API}/team`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (data) {
      yield put(actions.myTeamGetMyTeamSuccess(data))
    }
  } catch (error) {
    yield put(actions.myTeamGetMyTeamFail(error))
  }
}

export function* postNotificationOn(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const data = payload.payload
    const response = yield call(axios.post, `${IDENTITY_API}/nominate/`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (response) {
      yield put(actions.myTeamPostNotificationOnSuccess())
      yield put(actions.myTeamGetMyTeam())
    }
  } catch (error) {
    yield put(actions.myTeamPostNotificationOnFail(error))
  }
}

export function* postNotificationOff(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const data = payload.payload
    const response = yield call(
      axios.post,
      `${IDENTITY_API}/nominate/delete`,
      { ...data, role: ['notifications_recipient'] },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response) {
      yield put(actions.myTeamPostNotificationOffSuccess())
      yield put(actions.myTeamGetMyTeam())
    }
  } catch (error) {
    yield put(actions.myTeamPostNotificationOffFail(error))
  }
}

export function* postLevel(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const data = payload.payload
    const response = yield call(axios.put, `${CONTRIBUTORS_API}/trusted_level`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (response) {
      yield put(actions.myTeamPostLevelSuccess())
    }
  } catch (error) {
    yield put(actions.myTeamPostLevelFail(error))
  }
}

export function* deleteTeammate(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const data = payload.payload
    const response = yield call(axios.post, `${PARTICIPANT_API}/team/delete`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (response) {
      yield put(actions.myTeamDeleteTeammateSuccess())
      yield put(actions.myTeamGetMyTeam())
      toast.success(intl.get('myTeamPage.deleteSuccess'))
    }
  } catch (error) {
    yield put(actions.myTeamDeleteTeammateFail(error))
    toast.error(intl.get(`serverErrors.${error.response.data.error_id}`))
  }
}

export function* getContext() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const response = yield call(axios.get, `${PARTICIPANT_API}/t&t/context`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })
    if (response) {
      yield put(actions.myTeamGetContextSuccess(response.data.list))
      yield put(actions.myTeamGetMyTeam())
    }
  } catch (error) {
    yield put(actions.myTeamGetContextFail(error))
  }
}

export function* postContext(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    // eslint-disable-next-line camelcase
    const { access_type, id, context } = payload.payload
    const response = yield call(() =>
      axios.post(
        `${PARTICIPANT_API}/team`,
        { access_type, id, context: context || undefined },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
    )
    if (response) {
      yield put(actions.myTeamSetContextSuccess())
      yield put(actions.myTeamGetMyTeam())
    }
  } catch (error) {
    yield put(actions.myTeamSetContextFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_MY_TEAM, getMyTeam)
  yield takeEvery(actions.POST_NOTIFICATION_ON, postNotificationOn)
  yield takeEvery(actions.POST_NOTIFICATION_OFF, postNotificationOff)
  yield takeEvery(actions.POST_LEVEL, postLevel)
  yield takeEvery(actions.DELETE_TEAMMATE, deleteTeammate)
  yield takeEvery(actions.GET_CONTEXT, getContext)
  yield takeEvery(actions.SET_CONTEXT, postContext)
}
