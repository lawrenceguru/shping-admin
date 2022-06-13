import {
  GET_ALL,
  GET_ALL_SUCCESS,
  GET_ALL_FAIL,
  REMOVE_PARTICIPANT,
  REMOVE_PARTICIPANT_SUCCESS,
  REMOVE_PARTICIPANT_FAIL,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAIL,
  SET_TRIAL_PERIOD,
  SET_TRIAL_PERIOD_SUCCESS,
  SET_TRIAL_PERIOD_FAIL,
  SET_PAID_PERIOD,
  SET_PAID_PERIOD_SUCCESS,
  SET_PAID_PERIOD_FAIL,
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAIL,
  SET_TIMEZONE,
  SET_TIMEZONE_SUCCESS,
  SET_TIMEZONE_FAIL,
  SET_REWARDS_FEE,
  SET_REWARDS_FEE_SUCCESS,
  SET_REWARDS_FEE_FAIL,
  GET_CONSTRAINTS,
  GET_CONSTRAINTS_SUCCESS,
  GET_CONSTRAINTS_FAIL,
  SET_CONSTRAINTS,
  SET_CONSTRAINTS_SUCCESS,
  SET_CONSTRAINTS_FAIL,
  ADD_CONSTRAINTS,
  ADD_CONSTRAINTS_SUCCESS,
  ADD_CONSTRAINTS_FAIL,
  DELETE_CONSTRAINTS,
  DELETE_CONSTRAINTS_SUCCESS,
  DELETE_CONSTRAINTS_FAIL,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAIL,
  EDIT_BRAND,
  EDIT_BRAND_SUCCESS,
  EDIT_BRAND_FAIL,
  ADD_BRAND,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAIL,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  SET_CUSTOMER_FLAGS,
  SET_CUSTOMER_FLAGS_SUCCESS,
  SET_CUSTOMER_FLAGS_FAIL,
  CLEAR_CUSTOMER_INFO,
  GET_PORTFOLIOS,
  GET_PORTFOLIOS_SUCCESS,
  GET_PORTFOLIOS_FAIL,
  EDIT_PORTFOLIO,
  EDIT_PORTFOLIO_SUCCESS,
  EDIT_PORTFOLIO_FAIL,
  ADD_PORTFOLIO,
  ADD_PORTFOLIO_SUCCESS,
  ADD_PORTFOLIO_FAIL,
  DELETE_PORTFOLIO,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_FAIL,
  GET_PORTFOLIO,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_FAIL,
  CLEAR_ACTIVE_PORTFOLIO
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REMOVE_PARTICIPANT:
      return {
        ...state,
        isUpdating: true,
        isSuccessRemoving: false
      }
    case REMOVE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        isSuccessRemoving: true
      }
    case REMOVE_PARTICIPANT_FAIL:
      return {
        ...state,
        isUpdating: false,
        isSuccessRemoving: false
      }
    case DELETE_DATA:
      return {
        ...state,
        isUpdating: true
      }
    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case DELETE_DATA_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case SET_PAID_PERIOD:
      return {
        ...state,
        isUpdating: true
      }
    case SET_PAID_PERIOD_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case SET_PAID_PERIOD_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case SET_TRIAL_PERIOD:
      return {
        ...state,
        isUpdating: true
      }
    case SET_TRIAL_PERIOD_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case SET_TRIAL_PERIOD_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case SET_TIMEZONE:
      return {
        ...state,
        isUpdating: true
      }
    case SET_TIMEZONE_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case SET_TIMEZONE_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case SET_REWARDS_FEE:
      return {
        ...state,
        isUpdating: true
      }
    case SET_REWARDS_FEE_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case SET_REWARDS_FEE_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    case GET_ALL:
      return {
        ...state,
        customerIsLoading: true,
        filters: { ...payload, id: undefined }
      }
    case GET_ALL_SUCCESS:
      return {
        ...state,
        customerIsLoading: false,
        customerList: payload.data || [],
        customerCount: payload.count || 0
      }
    case GET_ALL_FAIL:
      return {
        ...state,
        customerIsLoading: false
      }
    case GET_CUSTOMER_INFO:
      return {
        ...state,
        customerInfoIsLoading: true
      }
    case GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        customerInfoIsLoading: false,
        customerInfo: payload
      }
    case GET_CUSTOMER_INFO_FAIL:
      return {
        ...state,
        customerInfoIsLoading: false
      }
    case GET_CONSTRAINTS:
      return {
        ...state,
        isLoadingConstraints: true
      }
    case GET_CONSTRAINTS_SUCCESS:
      return {
        ...state,
        constraints: payload,
        isLoadingConstraints: false
      }
    case GET_CONSTRAINTS_FAIL:
      return {
        ...state,
        isLoadingConstraints: false
      }
    case SET_CONSTRAINTS:
      return {
        ...state,
        isUpdatingConstraints: true
      }
    case SET_CONSTRAINTS_SUCCESS:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case SET_CONSTRAINTS_FAIL:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case ADD_CONSTRAINTS:
      return {
        ...state,
        isUpdatingConstraints: true
      }
    case ADD_CONSTRAINTS_SUCCESS:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case ADD_CONSTRAINTS_FAIL:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case DELETE_CONSTRAINTS:
      return {
        ...state,
        isUpdatingConstraints: true
      }
    case DELETE_CONSTRAINTS_SUCCESS:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case DELETE_CONSTRAINTS_FAIL:
      return {
        ...state,
        isUpdatingConstraints: false
      }
    case GET_BRANDS:
      return {
        ...state,
        isLoadingBrands: true
      }
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: payload,
        isLoadingBrands: false
      }
    case GET_BRANDS_FAIL:
      return {
        ...state,
        isLoadingBrands: false
      }
    case EDIT_BRAND:
      return {
        ...state,
        isUpdatingBrands: true
      }
    case EDIT_BRAND_SUCCESS:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case EDIT_BRAND_FAIL:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case ADD_BRAND:
      return {
        ...state,
        isUpdatingBrands: true
      }
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case ADD_BRAND_FAIL:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case DELETE_BRAND:
      return {
        ...state,
        isUpdatingBrands: true
      }
    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case DELETE_BRAND_FAIL:
      return {
        ...state,
        isUpdatingBrands: false
      }
    case GET_PORTFOLIO:
      return {
        ...state,
        isLoadingPortfolio: true
      }
    case GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        activePortfolio: payload,
        isLoadingPortfolio: false
      }
    case GET_PORTFOLIO_FAIL:
      return {
        ...state,
        isLoadingPortfolio: false
      }
    case CLEAR_ACTIVE_PORTFOLIO:
      return {
        ...state,
        activePortfolio: null
      }
    case GET_PORTFOLIOS:
      return {
        ...state,
        isLoadingPortfolios: true
      }
    case GET_PORTFOLIOS_SUCCESS:
      return {
        ...state,
        portfolios: payload,
        isLoadingPortfolios: false
      }
    case GET_PORTFOLIOS_FAIL:
      return {
        ...state,
        isLoadingPortfolios: false
      }
    case EDIT_PORTFOLIO:
      return {
        ...state,
        isUpdatingPortfolios: true
      }
    case EDIT_PORTFOLIO_SUCCESS:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case EDIT_PORTFOLIO_FAIL:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case ADD_PORTFOLIO:
      return {
        ...state,
        isUpdatingPortfolios: true
      }
    case ADD_PORTFOLIO_SUCCESS:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case ADD_PORTFOLIO_FAIL:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case DELETE_PORTFOLIO:
      return {
        ...state,
        isUpdatingPortfolios: true
      }
    case DELETE_PORTFOLIO_SUCCESS:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case DELETE_PORTFOLIO_FAIL:
      return {
        ...state,
        isUpdatingPortfolios: false
      }
    case CLEAR_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: null,
        isSuccessRemoving: false
      }
    case SET_CUSTOMER_FLAGS:
      return {
        ...state,
        isUpdating: true
      }
    case SET_CUSTOMER_FLAGS_SUCCESS:
      return {
        ...state,
        isUpdating: false
      }
    case SET_CUSTOMER_FLAGS_FAIL:
      return {
        ...state,
        isUpdating: false
      }
    default:
      return state
  }
}
