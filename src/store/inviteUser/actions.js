export const POST_INVITE_ACCOUNT = 'identity/POST_INVITE_ACCOUNT'
export const POST_INVITE_ACCOUNT_SUCCESS = 'identity/POST_INVITE_ACCOUNT_SUCCESS'
export const POST_INVITE_ACCOUNT_FAIL = 'identity/POST_INVITE_ACCOUNT_FAIL'

export const inviteUser = payload => ({
  type: POST_INVITE_ACCOUNT,
  payload
})

export const inviteUserSuccess = payload => ({
  type: POST_INVITE_ACCOUNT_SUCCESS,
  payload
})

export const inviteUserFailed = error => ({
  type: POST_INVITE_ACCOUNT_FAIL,
  payload: {
    error
  }
})
