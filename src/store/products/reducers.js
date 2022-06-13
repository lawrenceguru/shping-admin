import {
  GET_PRODUCTS_LIST,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCTS_GDTI,
  GET_PRODUCTS_GDTI_SUCCESS,
  GET_PRODUCTS_GDTI_FAIL,
  CLEAR_PRODUCTS_GDTI,
  CLEAR_PRODUCT_LIST,
  GET_PRODUCT_COMPLETE_LIKE,
  GET_PRODUCT_COMPLETE_LIKE_SUCCESS,
  GET_PRODUCT_COMPLETE_LIKE_FAIL,
  GET_PRODUCTS_INFO,
  GET_PRODUCTS_INFO_SUCCESS,
  GET_PRODUCTS_INFO_FAIL,
  GET_GDTI_COMPLETE_LIKE,
  GET_GDTI_COMPLETE_LIKE_SUCCESS,
  GET_GDTI_COMPLETE_LIKE_FAIL,
  GET_GDTI_INFO,
  GET_GDTI_INFO_SUCCESS,
  GET_GDTI_INFO_FAIL,
  GET_GDTI_FOR_REWARDS_COMPLETE_LIKE,
  GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_SUCCESS,
  GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_FAIL
} from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_LIST:
      return {
        ...state,
        isLoadingProductsList: true
      }
    case GET_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        products: payload.products,
        count: payload.count,
        isLoadingProductsList: false
      }
    case GET_PRODUCTS_LIST_FAIL:
      return {
        ...state,
        products: [],
        isLoadingProductsList: false
      }
    case GET_PRODUCTS_GDTI:
      return {
        ...state,
        isLoadingProductsGdti: true
      }
    case GET_PRODUCTS_GDTI_SUCCESS:
      return {
        ...state,
        gdti: payload.gdti,
        isLoadingProductsGdti: false
      }
    case GET_PRODUCTS_GDTI_FAIL:
      return {
        ...state,
        gdti: [],
        isLoadingProductsGdti: false
      }
    case GET_PRODUCT_COMPLETE_LIKE:
      return {
        ...state,
        completeListIsLoading: true
      }
    case GET_PRODUCT_COMPLETE_LIKE_SUCCESS:
      return {
        ...state,
        completeList: payload,
        completeListIsLoading: false
      }
    case GET_PRODUCT_COMPLETE_LIKE_FAIL:
      return {
        ...state,
        completeListIsLoading: false
      }
    case GET_GDTI_COMPLETE_LIKE:
      return {
        ...state,
        completeListGdtiIsLoading: true
      }
    case GET_GDTI_COMPLETE_LIKE_SUCCESS:
      return {
        ...state,
        completeGdtiList: payload,
        completeListGdtiIsLoading: false
      }
    case GET_GDTI_COMPLETE_LIKE_FAIL:
      return {
        ...state,
        completeListGdtiIsLoading: false
      }
    case CLEAR_PRODUCTS_GDTI:
      return {
        ...state,
        gdti: []
      }
    case GET_PRODUCTS_INFO:
      return {
        ...state,
        isLoadingProductInfo: true
      }
    case GET_PRODUCTS_INFO_SUCCESS:
      return {
        ...state,
        isLoadingProductInfo: false,
        productInfo: payload
      }
    case GET_PRODUCTS_INFO_FAIL:
      return {
        ...state,
        isLoadingProductInfo: false
      }
    case GET_GDTI_INFO:
      return {
        ...state,
        isLoadingGdtiInfo: true
      }
    case GET_GDTI_INFO_SUCCESS:
      return {
        ...state,
        isLoadingGdtiInfo: false,
        gdtiInfo: payload
      }
    case GET_GDTI_INFO_FAIL:
      return {
        ...state,
        isLoadingGdtiInfo: false
      }
    case GET_GDTI_FOR_REWARDS_COMPLETE_LIKE:
      return {
        ...state,
        completeListGdtiIsLoading: true
      }
    case GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_SUCCESS:
      return {
        ...state,
        completeGdtiList: payload,
        completeListGdtiIsLoading: false
      }
    case GET_GDTI_FOR_REWARDS_COMPLETE_LIKE_FAIL:
      return {
        ...state,
        completeListGdtiIsLoading: false
      }
    case CLEAR_PRODUCT_LIST:
      return {
        ...state,
        products: [],
        count: 0,
        isLoadingProductsList: false
      }
    default:
      return state
  }
}
