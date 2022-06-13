import { initialState } from './selectors'
import {
  INVENTORY_POST,
  INVENTORY_POST_SUCCESS,
  INVENTORY_POST_FAIL,
  INVENTORY_POST_EXPORT_FAIL,
  INVENTORY_POST_EXPORT_SUCCESS,
  INVENTORY_POST_EXPORT,
  INVENTORY_CLEAR_EXPORT
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INVENTORY_POST:
      return {
        ...state,
        isLoading: true
      }
    case INVENTORY_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all: payload.data,
        totalItems: payload.count
      }
    case INVENTORY_POST_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case INVENTORY_POST_EXPORT:
      return {
        ...state,
        isLoading: true
      }
    case INVENTORY_POST_EXPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fullData: payload.data
      }
    case INVENTORY_POST_EXPORT_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case INVENTORY_CLEAR_EXPORT:
      return {
        ...state,
        fullData: []
      }
    default:
      return state
  }
}
