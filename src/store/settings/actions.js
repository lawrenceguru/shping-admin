export const SETTINGS_SET_SIDEBAR_WIDTH = 'settings/SET_SIDEBAR_WIDTH'
export const SETTINGS_SET_LANGUAGE = 'settings/SET_LANGUAGE'

export const GET_COUNTRIES = 'settings/GET_COUNTRIES'
export const GET_COUNTRIES_SUCCESS = 'settings/GET_COUNTRIES_SUCCESS'
export const GET_COUNTRIES_FAIL = 'settings/GET_COUNTRIES_FAIL'

export const GET_LANGUAGES = 'settings/GET_LANGUAGES'
export const GET_LANGUAGES_SUCCESS = 'settings/GET_LANGUAGES_SUCCESS'
export const GET_LANGUAGES_FAIL = 'settings/GET_LANGUAGES_FAIL'

export const GET_TEXT_TYPES = 'settings/GET_TEXT_TYPES'
export const GET_TEXT_TYPES_SUCCESS = 'settings/GET_TEXT_TYPES_SUCCESS'
export const GET_TEXT_TYPES_FAIL = 'settings/GET_TEXT_TYPES_FAIL'

export const GET_DOCUMENTS_TYPE = 'settings/GET_DOCUMENTS_TYPE'
export const GET_DOCUMENTS_TYPE_SUCCESS = 'settings/GET_DOCUMENTS_TYPE_SUCCESS'
export const GET_DOCUMENTS_TYPE_FAIL = 'settings/GET_DOCUMENTS_TYPE_FAIL'

export const GET_REWARDS_ACTIONS = 'settings/GET_REWARDS_ACTIONS'
export const GET_REWARDS_ACTIONS_SUCCESS = 'settings/GET_REWARDS_ACTIONS_SUCCESS'
export const GET_REWARDS_ACTIONS_FAIL = 'settings/GET_REWARDS_ACTIONS_FAIL'

export const GET_ACTIVE_USERS = 'settings/GET_ACTIVE_USERS'
export const GET_ACTIVE_USERS_SUCCESS = 'settings/GET_ACTIVE_USERS_SUCCESS'
export const GET_ACTIVE_USERS_FAIL = 'settings/GET_ACTIVE_USERS_FAIL'

export const GET_TIMEZONE = 'settings/GET_TIMEZONE'
export const GET_TIMEZONE_SUCCESS = 'settings/GET_TIMEZONE_SUCCESS'
export const GET_TIMEZONE_FAIL = 'settings/GET_TIMEZONE_FAIL'

export const settingsSetSidebarWidth = payload => ({
  type: SETTINGS_SET_SIDEBAR_WIDTH,
  payload
})

export const settingsSetLanguage = payload => ({
  type: SETTINGS_SET_LANGUAGE,
  payload
})

export const settingsGetCountries = payload => ({
  type: GET_COUNTRIES,
  payload
})

export const settingsGetCountriesSuccess = payload => ({
  type: GET_COUNTRIES_SUCCESS,
  payload
})

export const settingsGetCountriesFail = payload => ({
  type: GET_COUNTRIES_FAIL,
  payload
})

export const settingsGetLanguages = payload => ({
  type: GET_LANGUAGES,
  payload
})

export const settingsGetLanguagesSuccess = payload => ({
  type: GET_LANGUAGES_SUCCESS,
  payload
})

export const settingsGetLanguagesFail = payload => ({
  type: GET_LANGUAGES_FAIL,
  payload
})

export const settingsGetTextTypes = payload => ({
  type: GET_TEXT_TYPES,
  payload
})

export const settingsGetTextTypesSuccess = payload => ({
  type: GET_TEXT_TYPES_SUCCESS,
  payload
})

export const settingsGetTextTypesFail = payload => ({
  type: GET_TEXT_TYPES_FAIL,
  payload
})

export const settingsGetDocumentsType = payload => ({
  type: GET_DOCUMENTS_TYPE,
  payload
})

export const settingsGetDocumentsTypeSuccess = payload => ({
  type: GET_DOCUMENTS_TYPE_SUCCESS,
  payload
})

export const settingsGetDocumentsTypeFail = payload => ({
  type: GET_DOCUMENTS_TYPE_FAIL,
  payload
})

export const settingsGetRewardsActions = payload => ({
  type: GET_REWARDS_ACTIONS,
  payload
})

export const settingsGetRewardsActionsSuccess = payload => ({
  type: GET_REWARDS_ACTIONS_SUCCESS,
  payload
})

export const settingsGetRewardsActionsFail = payload => ({
  type: GET_REWARDS_ACTIONS_FAIL,
  payload
})

export const settingsGetActiveUsers = payload => ({
  type: GET_ACTIVE_USERS,
  payload
})

export const settingsGetActiveUsersSuccess = payload => ({
  type: GET_ACTIVE_USERS_SUCCESS,
  payload
})

export const settingsGetActiveUsersFail = payload => ({
  type: GET_ACTIVE_USERS_FAIL,
  payload
})

export const settingsGetTimezone = payload => ({
  type: GET_TIMEZONE,
  payload
})

export const settingsGetTimezoneSuccess = payload => ({
  type: GET_TIMEZONE_SUCCESS,
  payload
})

export const settingsGetTimezoneFail = payload => ({
  type: GET_TIMEZONE_FAIL,
  payload
})
