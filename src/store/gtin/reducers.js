import {
  DELETE_GTIN,
  DELETE_GTIN_SUCCESS,
  DELETE_GTIN_FAIL,
  GET_GTIN,
  GET_GTIN_START,
  GET_GTIN_SUCCESS,
  GET_GTIN_FAIL,
  GET_GTIN_END,
  UPDATE_GTIN,
  UPDATE_GTIN_SUCCESS,
  UPDATE_GTIN_FAIL,
  UPDATE_GTIN_SOURCES_SUCCESS,
  CLEAR_GTIN_INFO,
  START_UPDATE_GTIN,
  END_UPDATE_GTIN
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_GTIN:
      return {
        ...state,
        isLoadingGtinInfo: true
      }
    case GET_GTIN_START:
      return {
        ...state,
        fetchingStatus: 'start'
      }
    case GET_GTIN_SUCCESS:
      return {
        ...state,
        data: payload.data,
        fetchingStatus: 'success',
        isLoadingGtinInfo: false
      }
    case GET_GTIN_FAIL:
      return {
        ...state,
        sources: [],
        fetchingStatus: 'failed',
        isLoadingGtinInfo: false
      }
    case GET_GTIN_END:
      return {
        ...state,
        fetchingStatus: 'end'
      }
    case DELETE_GTIN:
      return {
        ...state,
        isDeletingGtin: true
      }
    case DELETE_GTIN_SUCCESS:
      return {
        ...state,
        isDeletingGtin: false
      }
    case DELETE_GTIN_FAIL:
      return {
        ...state,
        isDeletingGtin: false
      }
    case UPDATE_GTIN:
      return {
        ...state,
        isUpdatingGtinInfo: true,
        updated: false
      }
    case UPDATE_GTIN_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isUpdatingGtinInfo: false,
        updated: true
      }
    case UPDATE_GTIN_FAIL:
      return {
        ...state,
        isUpdatingGtinInfo: false,
        updated: false
      }
    case UPDATE_GTIN_SOURCES_SUCCESS:
      return {
        ...state,
        data: payload.data
      }
    case CLEAR_GTIN_INFO:
      return {
        ...state,
        data: null
      }
    case START_UPDATE_GTIN:
      return {
        ...state,
        isTryUpdateGtin: true
      }
    case END_UPDATE_GTIN:
      return {
        ...state,
        isTryUpdateGtin: false
      }
    default:
      return state
  }
}
