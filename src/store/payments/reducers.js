/* eslint-disable no-unused-vars */
import {
  PAYMENTS_GET_PARTICIPANT_PLAN,
  PAYMENTS_GET_PARTICIPANT_PLAN_SUCCESS,
  PAYMENTS_GET_PARTICIPANT_PLAN_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PAYMENTS_GET_PARTICIPANT_PLAN:
      return {
        ...state,
        isLoading: true
      }
    case PAYMENTS_GET_PARTICIPANT_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...payload
      }
    case PAYMENTS_GET_PARTICIPANT_PLAN_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
