import { initialState } from './selectors'
import {
  GET_PARTICIPANT_PROFILE,
  GET_PARTICIPANT_PROFILE_SUCCESS,
  GET_PARTICIPANT_PROFILE_FAIL,
  GET_PARTICIPANT_DEPOSIT,
  GET_PARTICIPANT_DEPOSIT_SUCCESS,
  GET_PARTICIPANT_DEPOSIT_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PARTICIPANT_PROFILE:
      return {
        ...state,
        isParticipantProfileLoading: true
      }
    case GET_PARTICIPANT_PROFILE_SUCCESS:
      return {
        ...state,
        isParticipantProfileLoading: false,
        ...payload
      }
    case GET_PARTICIPANT_PROFILE_FAIL:
      return {
        ...state,
        isParticipantProfileLoading: false
      }
    case GET_PARTICIPANT_DEPOSIT:
      return {
        ...state
      }
    case GET_PARTICIPANT_DEPOSIT_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case GET_PARTICIPANT_DEPOSIT_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
