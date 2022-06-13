/* eslint-disable no-unused-vars */
import { AUTH_LOGIN_FORM_SUCCESS, AUTH_LOGIN_FORM_FAIL } from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_FORM_SUCCESS:
      return {
        ...state,
        isLoggingIn: true
      }
    case AUTH_LOGIN_FORM_FAIL:
      return {
        ...state,
        isLoggingIn: false
      }
    default:
      return state
  }
}
