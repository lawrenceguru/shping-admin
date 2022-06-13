import {
  SETTINGS_SET_SIDEBAR_WIDTH,
  SETTINGS_SET_LANGUAGE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAIL,
  GET_TEXT_TYPES,
  GET_TEXT_TYPES_SUCCESS,
  GET_TEXT_TYPES_FAIL,
  GET_DOCUMENTS_TYPE,
  GET_DOCUMENTS_TYPE_SUCCESS,
  GET_DOCUMENTS_TYPE_FAIL,
  GET_REWARDS_ACTIONS,
  GET_REWARDS_ACTIONS_SUCCESS,
  GET_REWARDS_ACTIONS_FAIL,
  GET_ACTIVE_USERS,
  GET_ACTIVE_USERS_SUCCESS,
  GET_ACTIVE_USERS_FAIL,
  GET_TIMEZONE,
  GET_TIMEZONE_SUCCESS,
  GET_TIMEZONE_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SETTINGS_SET_SIDEBAR_WIDTH:
      return {
        ...state,
        sidebarWidth: payload
      }
    case SETTINGS_SET_LANGUAGE:
      return {
        ...state,
        displayLanguage: payload
      }
    case GET_COUNTRIES:
      return {
        ...state,
        isLoadingCountries: true
      }
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload.countries,
        isLoadingCountries: false
      }
    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        countries: [],
        isLoadingCountries: false
      }
    case GET_LANGUAGES:
      return {
        ...state,
        isLoadingLanguages: true
      }
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: payload.languages,
        isLoadingLanguages: false
      }
    case GET_LANGUAGES_FAIL:
      return {
        ...state,
        languages: [],
        isLoadingLanguages: false
      }
    case GET_TEXT_TYPES:
      return {
        ...state,
        isLoadingTextTypes: true
      }
    case GET_TEXT_TYPES_SUCCESS:
      return {
        ...state,
        textTypes: payload,
        isLoadingTextTypes: false
      }
    case GET_TEXT_TYPES_FAIL:
      return {
        ...state,
        textTypes: [],
        isLoadingTextTypes: false
      }
    case GET_DOCUMENTS_TYPE:
      return {
        ...state,
        isLoadingType: true
      }
    case GET_DOCUMENTS_TYPE_SUCCESS:
      return {
        ...state,
        documentType: payload && payload.document_types,
        isLoadingType: false
      }
    case GET_DOCUMENTS_TYPE_FAIL:
      return {
        ...state,
        isLoadingType: false
      }
    case GET_REWARDS_ACTIONS:
      return {
        ...state,
        isLoadingActions: true
      }
    case GET_REWARDS_ACTIONS_SUCCESS:
      return {
        ...state,
        rewardsActions: payload,
        isLoadingActions: false
      }
    case GET_REWARDS_ACTIONS_FAIL:
      return {
        ...state,
        isLoadingActions: false
      }
    case GET_ACTIVE_USERS:
      return {
        ...state
      }
    case GET_ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        activeUsersCount: payload
      }
    case GET_ACTIVE_USERS_FAIL:
      return {
        ...state
      }
    case GET_TIMEZONE:
      return {
        ...state,
        isLoadingTimezones: true
      }
    case GET_TIMEZONE_SUCCESS:
      return {
        ...state,
        timezones: payload,
        isLoadingTimezones: false
      }
    case GET_TIMEZONE_FAIL:
      return {
        ...state,
        isLoadingTimezones: false
      }
    default:
      return state
  }
}
