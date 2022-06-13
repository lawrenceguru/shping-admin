import {
  GET_GDTI_CERTIFICATES,
  GET_GDTI_CERTIFICATES_SUCCESS,
  GET_GDTI_CERTIFICATES_FAIL,
  CLEAR_GDTI_INFO,
  GET_GDTI_NUTRITIONS,
  GET_GDTI_NUTRITIONS_SUCCESS,
  GET_GDTI_NUTRITIONS_FAIL,
  DELETE_GDTI,
  DELETE_GDTI_SUCCESS,
  DELETE_GDTI_FAIL,
  POST_GDTI,
  POST_GDTI_SUCCESS,
  POST_GDTI_FAIL,
  GET_GDTI,
  GET_GDTI_SUCCESS,
  GET_GDTI_FAIL,
  UPDATE_GDTI,
  UPDATE_GDTI_SUCCESS,
  UPDATE_GDTI_FAIL,
  GET_GDTI_ATTACHED_GTIN,
  GET_GDTI_ATTACHED_GTIN_SUCCESS,
  GET_GDTI_ATTACHED_GTIN_FAIL,
  POST_DETACHED_GDTI,
  POST_DETACHED_GDTI_SUCCESS,
  POST_DETACHED_GDTI_FAIL,
  POST_ATTACHED_GDTI,
  POST_ATTACHED_GDTI_SUCCESS,
  POST_ATTACHED_GDTI_FAIL,
  GDTI_ATTACH_PRODUCTS,
  GDTI_ATTACH_PRODUCTS_SUCCESS,
  GDTI_ATTACH_PRODUCTS_FAIL,
  GDTI_GLOBAL_ATTACH_PRODUCTS,
  GDTI_GLOBAL_ATTACH_PRODUCTS_SUCCESS,
  GDTI_GLOBAL_ATTACH_PRODUCTS_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GDTI_CERTIFICATES:
      return {
        ...state,
        isLoadingGdtiInfo: true
      }
    case GET_GDTI_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: payload.certificateList,
        isLoadingGdtiInfo: false
      }
    case GET_GDTI_CERTIFICATES_FAIL:
      return {
        ...state,
        certificates: [],
        isLoadingGdtiInfo: false
      }
    case GET_GDTI_NUTRITIONS:
      return {
        ...state,
        isLoadingGdtiNutritions: true
      }
    case GET_GDTI_NUTRITIONS_SUCCESS:
      return {
        ...state,
        nutritions: payload.nutritionsList,
        isLoadingGdtiNutritions: false
      }
    case GET_GDTI_NUTRITIONS_FAIL:
      return {
        ...state,
        nutritions: [],
        isLoadingGdtiNutritions: false
      }
    case DELETE_GDTI:
      return {
        ...state,
        deletedId: payload.id
      }
    case DELETE_GDTI_SUCCESS:
      return {
        ...state,
        deletedId: null
      }
    case DELETE_GDTI_FAIL:
      return {
        ...state,
        deletedId: null
      }
    case CLEAR_GDTI_INFO:
      return {
        initialState
      }
    case POST_GDTI:
      return {
        ...state,
        updated: false,
        isLoading: true,
        editId: null
      }
    case POST_GDTI_SUCCESS:
      return {
        ...state,
        updated: true,
        editId: payload,
        isLoading: false
      }
    case POST_GDTI_FAIL:
      return {
        ...state,
        updated: false,
        isLoading: false,
        editId: null
      }
    case GET_GDTI:
      return {
        ...state,
        updated: false,
        isLoading: true,
        editId: null
      }
    case GET_GDTI_SUCCESS:
      return {
        ...state,
        editGdti: payload,
        isLoading: false
      }
    case GET_GDTI_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_GDTI:
      return {
        ...state,
        updated: false,
        isLoading: true
      }
    case UPDATE_GDTI_SUCCESS:
      return {
        ...state,
        updated: true,
        isLoading: false
      }
    case UPDATE_GDTI_FAIL:
      return {
        ...state,
        updated: false,
        isLoading: false
      }
    case GET_GDTI_ATTACHED_GTIN:
      return {
        ...state,
        getRequestAttachedGtinIsLoading: true
      }
    case GET_GDTI_ATTACHED_GTIN_SUCCESS:
      return {
        ...state,
        attachedGtin: payload.attachedGtin,
        attachedBrands: payload.attachedBrands,
        isAllProducts: payload.isAllProducts,
        positionProductInfo: payload.positionProductInfo,
        positionProductInfoAll: payload.positionProductInfoAll,
        getRequestAttachedGtinIsLoading: false
      }
    case GET_GDTI_ATTACHED_GTIN_FAIL:
      return {
        ...state,
        getRequestAttachedGtinIsLoading: false
      }
    case POST_ATTACHED_GDTI:
      return {
        ...state,
        attachedGtinIsLoading: true
      }
    case POST_ATTACHED_GDTI_SUCCESS:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case POST_ATTACHED_GDTI_FAIL:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case POST_DETACHED_GDTI:
      return {
        ...state,
        attachedGtinIsLoading: true
      }
    case POST_DETACHED_GDTI_SUCCESS:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case POST_DETACHED_GDTI_FAIL:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case GDTI_GLOBAL_ATTACH_PRODUCTS:
      return {
        ...state,
        attachedGtinIsLoading: true
      }
    case GDTI_GLOBAL_ATTACH_PRODUCTS_SUCCESS:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case GDTI_GLOBAL_ATTACH_PRODUCTS_FAIL:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case GDTI_ATTACH_PRODUCTS:
      return {
        ...state,
        attachedGtinIsLoading: true
      }
    case GDTI_ATTACH_PRODUCTS_SUCCESS:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    case GDTI_ATTACH_PRODUCTS_FAIL:
      return {
        ...state,
        attachedGtinIsLoading: false
      }
    default:
      return state
  }
}
