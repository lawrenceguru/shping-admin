/* eslint-disable indent */
import axios from 'axios'
import { push } from 'connected-react-router'
import { all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects'
import { IDENTITY_API, PAYMENTS_API } from 'constants/url'
import {
  authLoginFormFail,
  authLoginFormSuccess,
  paymentsGetParticipantPlan,
  indexFieldsSerializationClearTableName,
  serializationFilterAnalyticClearFilters
} from 'store/actions'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'
import * as productsActions from '../products/actions'
import * as gdtiActions from '../gdti/actions'
import * as myTeamActions from '../myTeam/actions'
import { getIndexInfo } from '../indexFieldsProducts/sagas'
import { getTicket, getIdentity } from './selectors'
import { updateData } from '../filterAnalytics/sagas'
import { getParticipantProfile } from '../participant/sagas'
import { filterAnalyticClearFilters } from '../filterAnalytics/actions'

const clearFieldsConfiguration = () => {
  localStorage.removeItem('serializedFieldsConfiguration')
  localStorage.removeItem('supplyChainFieldsConfiguration')
}

const clearProductsFieldsConfiguration = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.includes('urn:authenticateit:participant')) {
      localStorage.removeItem(key)
    }
  })
}

const checkIfClearConfigurationNeeded = currEmail => {
  const lastEnteredEmail = localStorage.getItem('lastEnteredEmail')
  if (!lastEnteredEmail || lastEnteredEmail !== currEmail) {
    clearFieldsConfiguration()
    clearProductsFieldsConfiguration()
  }
}

export function* updateIndexData() {
  yield all([call(getIndexInfo)])
}

const checkTopup = ticket => {
  return axios
    .get(`${PAYMENTS_API}/participants/topup/min_amount`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    .then(res => {
      return !!res
    })
    .catch(err => {
      return !err
    })
}

export function* postSession({ payload }) {
  try {
    const { email: username, password } = payload
    checkIfClearConfigurationNeeded(username)
    const response = yield call(axios.post, `${IDENTITY_API}/session`, {
      password,
      username: username.toLowerCase()
    })
    const { token } = response.data

    response.data.enableTopup = yield call(checkTopup, response.data.ticket)

    if (token) {
      yield put(push(`/resend-activation-email?token=${token}`))
    } else {
      localStorage.setItem('session', JSON.stringify(response.data))
      localStorage.setItem('lastEnteredEmail', username)
      yield put(actions.identityPostSessionSuccess(response.data))
      yield put(actions.identityGetAccount(response.data))
    }
  } catch (error) {
    yield put(authLoginFormFail(error))
    yield put(actions.identityPostSessionFail(error))
  }
}

export function* putAccount({ payload }) {
  const session = localStorage.getItem('session')
  const ticket = yield select(fromIdentity.getTicket)

  try {
    const { data } = yield call(
      axios.put,
      `${IDENTITY_API}/account`,
      {
        ...payload
      },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          Accept: 'application/json, text/plain, */*'
        }
      }
    )

    localStorage.setItem(
      'session',
      session
        ? JSON.stringify(
            Object.assign(JSON.parse(session), data, {
              account: data
            })
          )
        : JSON.stringify(
            Object.assign(data, {
              account: data
            })
          )
    )

    let passwordUpdate = false
    if (payload.old_password && payload.password) {
      passwordUpdate = true
    }

    yield put(actions.identityPutAccountSuccess({ data, passwordUpdate }))

    toast.success(intl.get('alerts.putAccountSuccess'))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.identityPutAccountFail(error))
  }
}

export function* getAccount({ payload }) {
  const session = localStorage.getItem('session')
  const ticket = yield select(getTicket)
  try {
    const response = yield call(axios.get, `${IDENTITY_API}/account`, {
      headers: {
        authenticateit_identity_ticket: ticket || payload.ticket
      }
    })
    yield put(actions.identityGetAccountSuccess(response.data))

    localStorage.setItem(
      'session',
      session
        ? JSON.stringify(Object.assign(JSON.parse(session), response.data, { account: { ...response.data } }))
        : JSON.stringify(Object.assign(response.data, { account: { ...response.data } }))
    )

    if (payload.upgrade) {
      return
    }

    const roles = 'participants' in response.data && response.data.participants[0].roles

    yield put(authLoginFormSuccess())
    if ('pending_participant' in response.data && response.data.pending_participant !== null) {
      yield put(push('/submit-brand'))
    } else if (roles && (roles.includes('product_line') || roles.includes('contributors_moderator'))) {
      yield put(paymentsGetParticipantPlan(true))
    } else {
      yield put(push('/admin/settings/profile'))
    }
  } catch (error) {
    yield put(authLoginFormFail(error))
    yield put(actions.identityGetAccountFail(error))
  }
}

export function* deleteSession({ payload }) {
  const ticket = yield select(getTicket)

  if (!ticket && (!payload || !payload.ticket)) {
    return
  }

  try {
    yield call(axios.delete, `${IDENTITY_API}/session`, {
      headers: {
        authenticateit_identity_ticket: ticket || payload.ticket
      }
    })

    localStorage.removeItem('session')
    localStorage.removeItem('isCheckedOnRetailersWidgetAudience')
    localStorage.removeItem('isCheckedOnSalesWidgets')
    localStorage.removeItem('isCheckedOnSalesWidgetsConversion')
    yield put(actions.identityDeleteSessionSuccess())
  } catch (error) {
    yield put(actions.identityDeleteSessionFail(error))
  }
}

export function* getSession({ payload }) {
  const session = localStorage.getItem('session')
  const ticket = yield select(getTicket)
  try {
    const response = yield call(axios.get, `${IDENTITY_API}/session`, {
      headers: {
        authenticateit_identity_ticket: ticket || payload.ticket
      }
    })

    response.data.enableTopup = yield call(checkTopup, ticket || payload.ticket)
    localStorage.setItem(
      'session',
      session ? JSON.stringify(Object.assign(JSON.parse(session), response.data)) : JSON.stringify(response.data)
    )

    yield put(actions.identityGetSessionSuccess(JSON.parse(localStorage.getItem('session'))))
    if (payload.isNeedToGetAccount) {
      yield put(actions.identityGetAccount({ ticket: payload.ticket }))
    }
  } catch (error) {
    yield put(actions.identityGetSessionFail(error))
  }
}

export function* changeParticipant({ payload }) {
  try {
    const state = yield select(getIdentity)
    const { ticket } = state.identity
    const data = { new_participant: payload }
    const response = yield call(() =>
      axios.post(`${IDENTITY_API}/session/switch-context`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    let newModules = JSON.parse(localStorage.getItem('session')).modules
    response.data.participants.forEach(el => {
      if (el.id === response.data.current_participant) {
        newModules = el.modules
      }
    })

    let roles = []
    if (response && response.data && response.data.participants && response.data.participants.length) {
      const currParticipant = response.data.participants.filter(
        participant => participant.id === response.data.current_participant
      )

      roles = currParticipant && currParticipant.length && currParticipant[0].roles ? currParticipant[0].roles : []
    }

    yield put(
      actions.identityChangeParticipantSuccess({
        current_participant: response.data.current_participant,
        modules: newModules,
        roles
      })
    )
    const session = {
      ...JSON.parse(localStorage.getItem('session')),
      current_participant: response.data.current_participant,
      modules: newModules
    }
    yield put(filterAnalyticClearFilters())
    localStorage.setItem('session', JSON.stringify(session))
    clearFieldsConfiguration()
    yield put(serializationFilterAnalyticClearFilters())
    yield put(indexFieldsSerializationClearTableName())
    yield put(productsActions.clearProductsList())
    yield put(productsActions.clearProductsGdti())
    yield put(myTeamActions.clearMyTeam())
    yield put(myTeamActions.clearContextMyTeam())
    yield put(gdtiActions.clearGdtiInfo())
    yield put(gdtiActions.clearGdtiInfo())
    yield call(updateData)
    yield call(updateIndexData)
    yield call(getParticipantProfile)
  } catch (error) {
    yield put(actions.identityChangeParticipantFail(error))
  }
}

export function* restoreSendEmailForm(action) {
  try {
    yield put({ type: actions.IDENTITY_RESTORE_SEND_EMAIL_FORM_SUCCESS })
    yield put({
      type: actions.IDENTITY_POST_RESTORE_SEND_EMAIL,
      payload: action.payload
    })
  } catch (error) {
    yield put({ type: actions.IDENTITY_RESTORE_SEND_EMAIL_FORM_FAIL, error })
  }
}
export function* postRestoreSendEmail({ payload }) {
  try {
    yield call(axios.post, `${IDENTITY_API}/account/restore`, payload)
    yield put({ type: actions.IDENTITY_POST_RESTORE_SEND_EMAIL_SUCCESS })

    toast.success(intl.get('alerts.putRestoreAccountSuccess'))
  } catch (error) {
    yield put({ type: actions.IDENTITY_POST_RESTORE_SEND_EMAIL_FAIL, error })
  }
}
export function* restorePasswordForm(action) {
  try {
    yield put({ type: actions.IDENTITY_RESTORE_PASSWORD_FORM_SUCCESS })
    yield put({
      type: actions.IDENTITY_PUT_RESTORE_PASSWORD,
      payload: action.payload
    })
  } catch (error) {
    yield put({ type: actions.IDENTITY_RESTORE_PASSWORD_FORM_FAIL, error })
  }
}

export function* putRestorePassword({ payload: { code, newPassword } }) {
  try {
    yield call(axios.put, `${IDENTITY_API}/account/restore/${code}`, {
      password: newPassword
    })
    yield put({ type: actions.IDENTITY_PUT_RESTORE_PASSWORD_SUCCESS })

    toast.success(intl.get('alerts.putRestorePasswordSuccess'))
    window.location = 'https://shping-app.onelink.me/SGjH/cb138ed6'
  } catch (error) {
    yield put({ type: actions.IDENTITY_PUT_RESTORE_PASSWORD_FAIL, error })
  }
}

export default function*() {
  yield takeEvery(actions.IDENTITY_POST_SESSION, postSession)
  yield takeEvery(actions.IDENTITY_GET_ACCOUNT, getAccount)
  yield takeEvery(actions.IDENTITY_DELETE_SESSION, deleteSession)
  yield takeEvery(actions.IDENTITY_GET_SESSION, getSession)
  yield takeEvery(actions.IDENTITY_CHANGE_PARTICIPANT, changeParticipant)
  yield takeEvery(actions.IDENTITY_PUT_ACCOUNT, putAccount)
  yield takeLeading(actions.IDENTITY_RESTORE_SEND_EMAIL_FORM, restoreSendEmailForm)
  yield takeLeading(actions.IDENTITY_POST_RESTORE_SEND_EMAIL, postRestoreSendEmail)
  yield takeLeading(actions.IDENTITY_RESTORE_PASSWORD_FORM, restorePasswordForm)
  yield takeLeading(actions.IDENTITY_PUT_RESTORE_PASSWORD, putRestorePassword)
}
