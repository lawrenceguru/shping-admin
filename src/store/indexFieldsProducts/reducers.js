/* eslint-disable no-unused-vars */
import {
  GET_INDEX_INFO,
  GET_INDEX_INFO_SUCCESS,
  GET_INDEX_INFO_FAIL,
  POST_INDEX_INFO,
  POST_INDEX_INFO_SUCCESS,
  POST_INDEX_INFO_FAIL,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAIL
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_INDEX_INFO:
      return {
        ...state
      }
    case GET_INDEX_INFO_SUCCESS:
      return {
        ...state,
        tableName: payload.tableName,
        customIndexFields: payload.customIndexFields,
        defaultIndexFields: payload.defaultIndexFields,
        prevIndexFields: [...payload.customIndexFields],
        tableGdtiName: payload.tableGdtiName
      }
    case GET_INDEX_INFO_FAIL:
      return {
        ...state
      }
    case POST_INDEX_INFO:
      return {
        ...state,
        isLoadingIndexInfo: true
      }
    case POST_INDEX_INFO_SUCCESS:
      return {
        ...state,
        tableName: payload.tableName,
        indexFields: payload.indexFields,
        prevIndexFields: state.indexFields,
        isLoadingIndexInfo: false
      }
    case POST_INDEX_INFO_FAIL:
      return {
        ...state,
        isLoadingIndexInfo: false
      }
    case GET_BRANDS:
      return {
        ...state,
        isLoadingBrands: true
      }
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: payload.brands,
        isLoadingBrands: false
      }
    case GET_BRANDS_FAIL:
      return {
        ...state,
        isLoadingBrands: false
      }
    default:
      return state
  }
}
