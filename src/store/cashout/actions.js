export const GET_SETTINGS = 'cashout/GET_SETTINGS'
export const GET_SETTINGS_SUCCESS = 'cashout/GET_SETTINGS_SUCCESS'
export const GET_SETTINGS_FAIL = 'cashout/GET_SETTINGS_FAIL'

export const SET_SETTINGS = 'cashout/SET_SETTINGS'
export const SET_SETTINGS_SUCCESS = 'cashout/SET_SETTINGS_SUCCESS'
export const SET_SETTINGS_FAIL = 'cashout/SET_SETTINGS_FAIL'

export const cashoutGetSettings = payload => ({
  type: GET_SETTINGS,
  payload
})

export const cashoutGetSettingsSuccess = payload => ({
  type: GET_SETTINGS_SUCCESS,
  payload
})

export const cashoutGetSettingsFail = payload => ({
  type: GET_SETTINGS_FAIL,
  payload
})

export const cashoutSetSettings = payload => ({
  type: SET_SETTINGS,
  payload
})

export const cashoutSetSettingsSuccess = payload => ({
  type: SET_SETTINGS_SUCCESS,
  payload
})

export const cashoutSetSettingsFail = payload => ({
  type: SET_SETTINGS_FAIL,
  payload
})
