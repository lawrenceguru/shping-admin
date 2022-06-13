import { POST_INVITE_ACCOUNT, POST_INVITE_ACCOUNT_SUCCESS, POST_INVITE_ACCOUNT_FAIL } from './actions'
import { initialState } from './selectors'

// eslint-disable-next-line no-unused-vars
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_INVITE_ACCOUNT:
      return {
        ...state,
        isLoading: true
      }
    case POST_INVITE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case POST_INVITE_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
