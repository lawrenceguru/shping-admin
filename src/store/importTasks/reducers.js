import {
  GET_IMPORT_PARTICIPANTS,
  GET_IMPORT_PARTICIPANTS_SUCCESS,
  GET_IMPORT_PARTICIPANTS_FAIL,
  GET_IMPORT_PARTICIPANT_HISTORY,
  GET_IMPORT_PARTICIPANT_HISTORY_SUCCESS,
  GET_IMPORT_PARTICIPANT_HISTORY_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_IMPORT_PARTICIPANTS:
      return {
        ...state,
        participantsIsLoading: true
      }
    case GET_IMPORT_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        participantsIsLoading: false,
        participants: payload
      }
    case GET_IMPORT_PARTICIPANTS_FAIL:
      return {
        ...state,
        participantsIsLoading: false
      }
    case GET_IMPORT_PARTICIPANT_HISTORY:
      return {
        ...state,
        participantHistoryIsLoading: true
      }
    case GET_IMPORT_PARTICIPANT_HISTORY_SUCCESS:
      return {
        ...state,
        participantHistoryIsLoading: false,
        participantHistory: payload
      }
    case GET_IMPORT_PARTICIPANT_HISTORY_FAIL:
      return {
        ...state,
        participantHistoryIsLoading: false
      }
    default:
      return state
  }
}
