import {
  GET_SELECT_RANGE,
  GET_SELECT_CUSTOMER,
  GET_RANGE_DATES,
  LOAD_NEW_FILTER_INFO,
  SET_CURRENT_TAB,
  CLEAR_FILTERS
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SELECT_RANGE:
      return {
        ...state,
        dateAs: payload
      }
    case GET_RANGE_DATES:
      return {
        ...state,
        fromDate: payload && payload[0],
        toDate: payload && payload[1]
      }
    case GET_SELECT_CUSTOMER:
      return {
        ...state,
        issuer: payload
      }
    case LOAD_NEW_FILTER_INFO:
      return {
        ...state,
        isLoadingNewFiltersInfo: payload.isLoadingNewFiltersInfo
      }
    case SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: payload
      }
    case CLEAR_FILTERS:
      return initialState
    default:
      return state
  }
}
