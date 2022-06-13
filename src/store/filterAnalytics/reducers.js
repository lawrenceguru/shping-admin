import {
  GET_SELECT_RANGE,
  GET_SELECT_COUNTRY,
  GET_RANGE_DATES,
  GET_SELECT_GTIN,
  GET_FIRST_DATE,
  GET_SECOND_DATE,
  GET_SELECT_BRAND,
  LOAD_NEW_FILTER_INFO,
  SET_CURRENT_TAB,
  GET_SELECT_STATE,
  GET_SELECT_POSTCODE,
  GET_SELECT_CITY,
  GET_ADS_MODE,
  CLEAR_FILTERS
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SELECT_RANGE:
      return {
        ...state,
        selectRange: payload
      }
    case GET_SELECT_COUNTRY:
      return {
        ...state,
        selectCountry: payload
      }
    case GET_RANGE_DATES:
      return {
        ...state,
        selectFirstDate: payload && payload[0],
        selectSecondDate: payload && payload[1]
      }
    case GET_FIRST_DATE:
      return {
        ...state,
        selectFirstDate: payload
      }
    case GET_SECOND_DATE:
      return {
        ...state,
        selectSecondDate: payload
      }
    case GET_SELECT_BRAND:
      return {
        ...state,
        selectBrand: payload
      }
    case GET_SELECT_STATE:
      return {
        ...state,
        selectState: payload
      }
    case GET_SELECT_CITY:
      return {
        ...state,
        selectCity: payload
      }
    case GET_SELECT_POSTCODE:
      return {
        ...state,
        selectPostcode: payload
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
    case GET_SELECT_GTIN:
      return {
        ...state,
        selectGtin: payload
      }
    case GET_ADS_MODE:
      return {
        ...state,
        adsMode: payload
      }
    case CLEAR_FILTERS:
      return initialState
    default:
      return state
  }
}
