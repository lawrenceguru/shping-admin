import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { SETTINGS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import 'react-toastify/dist/ReactToastify.css'
import * as actions from './actions'
import { getActiveUsersCount } from '../../utils/settings'

export function* getCountries() {
  try {
    const response = yield call(axios.get, `${SETTINGS_API}/countries`)
    if (response) {
      const {
        data: { countries }
      } = response
      yield put(actions.settingsGetCountriesSuccess({ countries }))
    }
  } catch (error) {
    yield put(actions.settingsGetCountriesFail(error))
  }
}

export function* getLanguages() {
  try {
    const response = yield call(axios.get, `${SETTINGS_API}/languages`)
    if (response) {
      const {
        data: { languages }
      } = response
      yield put(actions.settingsGetLanguagesSuccess({ languages }))
    }
  } catch (error) {
    yield put(actions.settingsGetLanguagesFail(error))
  }
}

export function* getTextTypes() {
  try {
    const response = yield call(axios.get, `${SETTINGS_API}/text_widget_types`)
    if (response && response.data) {
      yield put(actions.settingsGetTextTypesSuccess(response.data.text_widget_types))
    }
  } catch (error) {
    yield put(actions.settingsGetTextTypesFail(error))
  }
}
export function* getDocumentsType() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${SETTINGS_API}/document_types/`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const participantType = yield select(fromIdentity.getParticipantType)

    if (
      !participantType ||
      (!participantType.includes('system') && !participantType.includes('expert') && data.document_types)
    ) {
      Object.keys(data.document_types).forEach(key => {
        if (data.document_types[key].name.toLowerCase() === 'certificate') {
          delete data.document_types[key]
        }
      })
    }

    yield put(actions.settingsGetDocumentsTypeSuccess(data))
  } catch (error) {
    yield put(actions.settingsGetDocumentsTypeFail(error))
  }
}

export function* getRewardsActions() {
  try {
    const {
      // eslint-disable-next-line camelcase
      data: { rewards_actions }
    } = yield call(axios.get, `${SETTINGS_API}/rewards_actions`)

    yield put(actions.settingsGetRewardsActionsSuccess(rewards_actions))
  } catch (error) {
    yield put(actions.settingsGetRewardsActionsFail(error))
  }
}

export function* getActiveUsers() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const currentParticipant = yield select(fromIdentity.getCurrentParticipant)

    const { data } = yield call(() =>
      axios.get(`${SETTINGS_API}/past_active_users `, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.settingsGetActiveUsersSuccess(getActiveUsersCount(data, currentParticipant)))
  } catch (error) {
    yield put(actions.settingsGetActiveUsersFail(error))
  }
}

export function* getTimezone() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${SETTINGS_API}/timezones`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.settingsGetTimezoneSuccess(data && data.timezones))
  } catch (error) {
    yield put(actions.settingsGetTimezoneFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_COUNTRIES, getCountries)
  yield takeEvery(actions.GET_LANGUAGES, getLanguages)
  yield takeEvery(actions.GET_TEXT_TYPES, getTextTypes)
  yield takeEvery(actions.GET_DOCUMENTS_TYPE, getDocumentsType)
  yield takeEvery(actions.GET_REWARDS_ACTIONS, getRewardsActions)
  yield takeEvery(actions.GET_ACTIVE_USERS, getActiveUsers)
  yield takeEvery(actions.GET_TIMEZONE, getTimezone)
}
