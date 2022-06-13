import { initialState } from './selectors'
import {
  POST_SERIALIZATION_GTIN_SELECT,
  POST_SERIALIZATION_GTIN_SELECT_SUCCESS,
  POST_SERIALIZATION_GTIN_SELECT_FAIL,
  POST_SERIALIZATION_GTIN_VALUES,
  POST_SERIALIZATION_GTIN_VALUES_SUCCESS,
  POST_SERIALIZATION_GTIN_VALUES_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_SERIALIZATION_GTIN_SELECT:
      return {
        ...state,
        isLoading: true
      }
    case POST_SERIALIZATION_GTIN_SELECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: payload.count,
        allData: payload.data
      }
    case POST_SERIALIZATION_GTIN_SELECT_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case POST_SERIALIZATION_GTIN_VALUES:
      return {
        ...state,
        isLoading: true
      }
    case POST_SERIALIZATION_GTIN_VALUES_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case POST_SERIALIZATION_GTIN_VALUES_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
