import { initialState } from './selectors'
import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAIL,
  SET_SETTINGS,
  SET_SETTINGS_SUCCESS,
  SET_SETTINGS_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SETTINGS:
      return {
        ...state,
        isLoading: true
      }
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: payload,
        isLoading: false
      }
    case GET_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case SET_SETTINGS:
      return {
        ...state,
        isLoading: true
      }
    case SET_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case SET_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
