export const POST_CREATE_ACCOUNT = 'identity/POST_CREATE_ACCOUNT'
export const POST_CREATE_ACCOUNT_SUCCESS = 'identity/POST_CREATE_ACCOUNT_SUCCESS'
export const POST_CREATE_ACCOUNT_FAIL = 'identity/POST_CREATE_ACCOUNT_FAIL'

export const createUser = payload => ({
  type: POST_CREATE_ACCOUNT,
  payload
})

export const createUserSuccess = payload => ({
  type: POST_CREATE_ACCOUNT_SUCCESS,
  payload
})

export const createUserFailed = error => ({
  type: POST_CREATE_ACCOUNT_FAIL,
  payload: {
    error
  }
})
