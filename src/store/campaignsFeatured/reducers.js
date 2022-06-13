import {
  GET_FEATURED_LIST,
  GET_FEATURED_LIST_SUCCESS,
  GET_FEATURED_LIST_FAIL,
  FEATURED_STATUS_TOGGLE,
  FEATURED_STATUS_TOGGLE_SUCCESS,
  FEATURED_STATUS_TOGGLE_FAIL,
  GET_FEATURED_CHART,
  GET_FEATURED_CHART_SUCCESS,
  GET_FEATURED_CHART_FAIL,
  POST_CAMPAIGN_FEATURED,
  POST_CAMPAIGN_FEATURED_SUCCESS,
  POST_CAMPAIGN_FEATURED_FAIL,
  PUT_CAMPAIGN_FEATURED,
  PUT_CAMPAIGN_FEATURED_SUCCESS,
  PUT_CAMPAIGN_FEATURED_FAIL
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_FEATURED_LIST:
      return {
        ...state,
        isLoading: true,
        updated: false
      }
    case GET_FEATURED_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        featuredList: payload
      }
    case GET_FEATURED_LIST_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case FEATURED_STATUS_TOGGLE:
      return {
        ...state,
        isUpdating: true
      }
    case FEATURED_STATUS_TOGGLE_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case FEATURED_STATUS_TOGGLE_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case GET_FEATURED_CHART:
      return {
        ...state,
        chartIsLoading: true
      }
    case GET_FEATURED_CHART_SUCCESS:
      return {
        ...state,
        chartIsLoading: false,
        chart: payload
      }
    case GET_FEATURED_CHART_FAIL:
      return {
        ...state,
        chartIsLoading: false
      }
    case POST_CAMPAIGN_FEATURED:
      return {
        ...state,
        isLoading: true,
        updated: false
      }
    case POST_CAMPAIGN_FEATURED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updated: true
      }
    case POST_CAMPAIGN_FEATURED_FAIL:
      return {
        ...state,
        isLoading: false,
        updated: false
      }
    case PUT_CAMPAIGN_FEATURED:
      return {
        ...state,
        isLoading: true,
        updated: false
      }
    case PUT_CAMPAIGN_FEATURED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updated: true
      }
    case PUT_CAMPAIGN_FEATURED_FAIL:
      return {
        ...state,
        isLoading: false,
        updated: false
      }
    default:
      return state
  }
}
