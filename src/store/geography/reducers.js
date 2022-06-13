/* eslint-disable no-unused-vars */
import {
  GET_COORDINATES,
  GET_COORDINATES_SUCCESS,
  GET_COORDINATES_FAIL,
  GET_COUNTRIES_TOTAL,
  GET_COUNTRIES_TOTAL_SUCCESS,
  GET_COUNTRIES_TOTAL_FAIL,
  GET_STATES,
  GET_STATES_SUCCESS,
  GET_STATES_FAIL
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_COORDINATES:
      return {
        ...state
      }
    case GET_COORDINATES_SUCCESS:
      return {
        ...state,
        coordinates: payload.coordinates
      }
    case GET_COORDINATES_FAIL:
      return {
        ...state,
        coordinates: []
      }
    case GET_COUNTRIES_TOTAL:
      return {
        ...state
      }
    case GET_COUNTRIES_TOTAL_SUCCESS:
      return {
        ...state,
        countries: payload.countries
      }
    case GET_COUNTRIES_TOTAL_FAIL:
      return {
        ...state,
        countries: []
      }
    case GET_STATES:
      return {
        ...state
      }
    case GET_STATES_SUCCESS:
      return {
        ...state,
        states: payload.states
      }
    case GET_STATES_FAIL:
      return {
        ...state,
        states: []
      }
    default:
      return state
  }
}
