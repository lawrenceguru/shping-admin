import { initialState } from './selectors'
import {
  POST_SUPPLY_PARTICIPANTS,
  POST_SUPPLY_PARTICIPANTS_SUCCESS,
  POST_SUPPLY_PARTICIPANTS_FAIL,
  GET_SUPPLY_PARTICIPANTS,
  GET_SUPPLY_PARTICIPANTS_FAIL,
  GET_SUPPLY_PARTICIPANTS_SUCCESS,
  DELETE_SUPPLY_PARTICIPANT,
  DELETE_SUPPLY_PARTICIPANT_SUCCESS,
  DELETE_SUPPLY_PARTICIPANT_FAIL,
  EDIT_PARTICIPANT,
  SELECT_PARTICIPANT
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_SUPPLY_PARTICIPANTS:
      return {
        ...state,
        isSupplyParticipantsLoading: true
      }
    case POST_SUPPLY_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        isSupplyParticipantsLoading: false
      }
    case POST_SUPPLY_PARTICIPANTS_FAIL:
      return {
        ...state,
        isSupplyParticipantsLoading: false
      }
    case GET_SUPPLY_PARTICIPANTS:
      return {
        ...state,
        isSupplyParticipantsLoading: true
      }
    case GET_SUPPLY_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        count: payload.count,
        limit: payload.limit,
        offset: payload.offset,
        isSupplyParticipantsLoading: false,
        supplyParticipants: payload.participants
      }
    case GET_SUPPLY_PARTICIPANTS_FAIL:
      return {
        ...state,
        supplyParticipants: [],
        isSupplyParticipantsLoading: false
      }
    case DELETE_SUPPLY_PARTICIPANT:
      return {
        ...state,
        isSupplyParticipantsLoading: true
      }
    case DELETE_SUPPLY_PARTICIPANT_SUCCESS:
      return {
        ...state,
        isSupplyParticipantsLoading: false
      }
    case DELETE_SUPPLY_PARTICIPANT_FAIL:
      return {
        ...state,
        isSupplyParticipantsLoading: false
      }
    case EDIT_PARTICIPANT:
      return {
        ...state,
        currentParticipantData: payload.data,
        countries: payload.countries || state.countries
      }
    case SELECT_PARTICIPANT:
      return {
        ...state,
        selectedParticipantId: payload.id
      }
    default:
      return state
  }
}
