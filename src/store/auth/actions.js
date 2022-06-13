export const AUTH_LOGIN_FORM = 'auth/LOGIN_FORM_SUBMIT'
export const AUTH_LOGIN_FORM_SUCCESS = 'auth/LOGIN_FORM_SUCCESS'
export const AUTH_LOGIN_FORM_FAIL = 'auth/LOGIN_FORM_FAILURE'

export const authLoginFormSuccess = () => ({
  type: AUTH_LOGIN_FORM_SUCCESS
})

export const authLoginFormFail = error => ({
  type: AUTH_LOGIN_FORM_FAIL,
  payload: {
    error
  }
})
