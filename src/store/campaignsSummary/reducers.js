import {
  GET_SUMMARY_REPORTS,
  GET_SUMMARY_REPORTS_SUCCESS,
  GET_SUMMARY_REPORTS_FAIL,
  DELETE_SUMMARY_REPORT,
  DELETE_SUMMARY_REPORT_SUCCESS,
  DELETE_SUMMARY_REPORT_FAIL,
  POST_SUMMARY_REPORT,
  POST_SUMMARY_REPORT_SUCCESS,
  POST_SUMMARY_REPORT_FAIL,
  GET_DETAILS_FOR_SUMMARY_REPORT,
  GET_DETAILS_FOR_SUMMARY_REPORT_SUCCESS,
  GET_DETAILS_FOR_SUMMARY_REPORT_FAIL
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_SUMMARY_REPORTS:
      return {
        ...state,
        isLoading: true,
        isUpdated: false
      }
    case GET_SUMMARY_REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reports: payload
      }
    case GET_SUMMARY_REPORTS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_SUMMARY_REPORT:
      return {
        ...state,
        deletingId: payload
      }
    case DELETE_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        deletingId: null
      }
    case DELETE_SUMMARY_REPORT_FAIL:
      return {
        ...state,
        deletingId: null
      }
    case POST_SUMMARY_REPORT:
      return {
        ...state,
        isLoading: true,
        isUpdated: false
      }
    case POST_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: true
      }
    case POST_SUMMARY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isUpdated: false
      }
    case GET_DETAILS_FOR_SUMMARY_REPORT:
      return {
        ...state,
        isLoading: true
      }
    case GET_DETAILS_FOR_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        details: payload
      }
    case GET_DETAILS_FOR_SUMMARY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
