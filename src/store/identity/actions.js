export const IDENTITY_POST_SESSION = 'identity/POST_SESSION'
export const IDENTITY_POST_SESSION_SUCCESS = 'identity/POST_SESSION_SUCCESS'
export const IDENTITY_POST_SESSION_FAIL = 'identity/POST_SESSION_FAIL'
export const IDENTITY_GET_ACCOUNT = 'identity/GET_ACCOUNT'
export const IDENTITY_GET_ACCOUNT_SUCCESS = 'identity/GET_ACCOUNT_SUCCESS'
export const IDENTITY_GET_ACCOUNT_FAIL = 'identity/GET_ACCOUNT_FAIL'
export const IDENTITY_DELETE_SESSION = 'identity/DELETE_SESSION'
export const IDENTITY_DELETE_SESSION_SUCCESS = 'identity/DELETE_SESSION_SUCCESS'
export const IDENTITY_DELETE_SESSION_FAIL = 'identity/DELETE_SESSION_FAIL'
export const IDENTITY_GET_SESSION = 'identity/GET_SESSION'
export const IDENTITY_GET_SESSION_SUCCESS = 'identity/GET_SESSION_SUCCESS'
export const IDENTITY_GET_SESSION_FAIL = 'identity/GET_SESSION_FAIL'
export const IDENTITY_CHANGE_PARTICIPANT = 'identity/CHANGE_PARTICIPANT'
export const IDENTITY_CHANGE_PARTICIPANT_SUCCESS = 'identity/CHANGE_PARTICIPANT_SUCCESS'
export const IDENTITY_CHANGE_PARTICIPANT_FAIL = 'identity/CHANGE_PARTICIPANT_FAIL'
export const IDENTITY_PUT_ACCOUNT = 'identity/IDENTITY_PUT_ACCOUNT'
export const IDENTITY_PUT_ACCOUNT_SUCCESS = 'identity/IDENTITY_PUT_ACCOUNT_SUCCESS'
export const IDENTITY_PUT_ACCOUNT_FAIL = 'identity/IDENTITY_PUT_ACCOUNT_FAIL'
export const IDENTITY_POST_RESTORE_SEND_EMAIL = 'identity/POST_RESTORE_SEND_EMAIL'
export const IDENTITY_POST_RESTORE_SEND_EMAIL_SUCCESS = 'identity/POST_RESTORE_SEND_EMAIL_SUCCESS'
export const IDENTITY_POST_RESTORE_SEND_EMAIL_FAIL = 'identity/POST_RESTORE_SEND_EMAIL_FAIL'
export const IDENTITY_PUT_RESTORE_PASSWORD = 'identity/PUT_RESTORE_PASSWORD'
export const IDENTITY_PUT_RESTORE_PASSWORD_SUCCESS = 'identity/PUT_RESTORE_PASSWORD_SUCCESS'
export const IDENTITY_PUT_RESTORE_PASSWORD_FAIL = 'identity/PUT_RESTORE_PASSWORD_FAIL'
export const IDENTITY_RESTORE_SEND_EMAIL_FORM_FAIL = 'identity/RESTORE_SEND_EMAIL_FORM_FAILURE'
export const IDENTITY_RESTORE_SEND_EMAIL_FORM_SUCCESS = 'identity/RESTORE_SEND_EMAIL_FORM_SUCCESS'
export const IDENTITY_RESTORE_SEND_EMAIL_FORM = 'identity/RESTORE_SEND_EMAIL_FORM_SUBMIT'
export const IDENTITY_RESTORE_PASSWORD_FORM_FAIL = 'identity/RESTORE_PASSWORD_FORM_FAILURE'
export const IDENTITY_RESTORE_PASSWORD_FORM_SUCCESS = 'identity/RESTORE_PASSWORD_FORM_SUCCESS'
export const IDENTITY_RESTORE_PASSWORD_FORM = 'identity/RESTORE_PASSWORD_FORM_SUBMIT'

export const identityPostSession = payload => ({
  type: IDENTITY_POST_SESSION,
  payload
})

export const identityPostSessionSuccess = payload => ({
  type: IDENTITY_POST_SESSION_SUCCESS,
  payload
})

export const identityPostSessionFail = error => ({
  type: IDENTITY_POST_SESSION_FAIL,
  payload: {
    error
  }
})

export const identityGetAccount = payload => ({
  type: IDENTITY_GET_ACCOUNT,
  payload
})

export const identityGetAccountSuccess = payload => ({
  type: IDENTITY_GET_ACCOUNT_SUCCESS,
  payload
})

export const identityGetAccountFail = error => ({
  type: IDENTITY_GET_ACCOUNT_FAIL,
  payload: {
    error
  }
})

export const identityPutAccount = payload => ({
  type: IDENTITY_PUT_ACCOUNT,
  payload
})

export const identityPutAccountSuccess = payload => ({
  type: IDENTITY_PUT_ACCOUNT_SUCCESS,
  payload
})

export const identityPutAccountFail = payload => ({
  type: IDENTITY_PUT_ACCOUNT_FAIL,
  payload
})

export const identityDeleteSession = () => ({
  type: IDENTITY_DELETE_SESSION,
  payload: JSON.parse(localStorage.getItem('session'))
})

export const identityDeleteSessionSuccess = () => ({
  type: IDENTITY_DELETE_SESSION_SUCCESS
})

export const identityDeleteSessionFail = error => ({
  type: IDENTITY_DELETE_SESSION_FAIL,
  payload: {
    error
  }
})

export const identityGetSession = payload => ({
  type: IDENTITY_GET_SESSION,
  payload
})

export const identityGetSessionSuccess = payload => ({
  type: IDENTITY_GET_SESSION_SUCCESS,
  payload
})

export const identityGetSessionFail = error => ({
  type: IDENTITY_GET_SESSION_FAIL,
  payload: {
    error
  }
})

export const identityChangeParticipant = payload => ({
  type: IDENTITY_CHANGE_PARTICIPANT,
  payload
})

export const identityChangeParticipantSuccess = payload => ({
  type: IDENTITY_CHANGE_PARTICIPANT_SUCCESS,
  payload
})

export const identityChangeParticipantFail = error => ({
  type: IDENTITY_CHANGE_PARTICIPANT_FAIL,
  payload: {
    error
  }
})
