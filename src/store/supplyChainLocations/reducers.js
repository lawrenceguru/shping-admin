import { initialState } from './selectors'
import {
  GET_SUPPLY_PARTICIPANT_LOCATION,
  GET_SUPPLY_PARTICIPANT_LOCATION_SUCCESS,
  GET_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  DELETE_SUPPLY_PARTICIPANT_LOCATION,
  DELETE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS,
  DELETE_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  CREATE_SUPPLY_PARTICIPANT_LOCATION,
  CREATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS,
  CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL,
  SELECT_LOCATION,
  CLEAR_SELECTED_LOCATION,
  UPDATE_SUPPLY_PARTICIPANT_LOCATION,
  UPDATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS,
  UPDATE_SUPPLY_PARTICIPANT_LOCATION_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SUPPLY_PARTICIPANT_LOCATION:
      return {
        ...state,
        isSupplyParticipantsLocationLoading: true
      }
    case GET_SUPPLY_PARTICIPANT_LOCATION_SUCCESS:
      return {
        ...state,
        supplyParticipantsLocations: payload.participants,
        isSupplyParticipantsLocationLoading: false
      }
    case GET_SUPPLY_PARTICIPANT_LOCATION_FAIL:
      return {
        ...state,
        supplyParticipantsLocations: [],
        isSupplyParticipantsLocationLoading: false
      }
    case DELETE_SUPPLY_PARTICIPANT_LOCATION:
      return {
        ...state
      }
    case DELETE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS:
      return {
        ...state,
        isSupplyParticipantsLocationDeleting: false
      }
    case DELETE_SUPPLY_PARTICIPANT_LOCATION_FAIL:
      return {
        ...state,
        supplyParticipantsLocations: [],
        isSupplyParticipantsLocationDeleting: false
      }
    case CREATE_SUPPLY_PARTICIPANT_LOCATION:
      return {
        ...state,
        isNeedReturnToLocationsPage: false
      }
    case CREATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS:
      return {
        ...state,
        isSupplyParticipantsLocationCreating: false,
        isNeedReturnToLocationsPage: true
      }
    case CREATE_SUPPLY_PARTICIPANT_LOCATION_FAIL:
      return {
        ...state,
        isSupplyParticipantsLocationCreating: false
      }
    case SELECT_LOCATION:
      return {
        ...state,
        locationData: payload
      }
    case CLEAR_SELECTED_LOCATION:
      return {
        ...state,
        locationData: null,
        isNeedReturnToLocationsPage: false
      }
    case UPDATE_SUPPLY_PARTICIPANT_LOCATION:
      return {
        ...state,
        isNeedReturnToLocationsPage: false
      }
    case UPDATE_SUPPLY_PARTICIPANT_LOCATION_SUCCESS:
      return {
        ...state,
        isSupplyParticipantsLocationCreating: false,
        isNeedReturnToLocationsPage: true
      }
    case UPDATE_SUPPLY_PARTICIPANT_LOCATION_FAIL:
      return {
        ...state,
        isSupplyParticipantsLocationCreating: false
      }
    default:
      return state
  }
}
