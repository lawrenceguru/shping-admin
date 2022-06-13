import {
  GET_PRODUCTS_STATISTIC,
  GET_PRODUCTS_STATISTIC_SUCCESS,
  GET_PRODUCTS_STATISTIC_FAIL,
  GET_CREATED_PRODUCTS,
  GET_CREATED_PRODUCTS_SUCCESS,
  GET_CREATED_PRODUCTS_FAIL,
  GET_INTO_CIRCULATION_PRODUCTS,
  GET_INTO_CIRCULATION_PRODUCTS_SUCCESS,
  GET_INTO_CIRCULATION_PRODUCTS_FAIL,
  GET_SHIPPED_PRODUCTS,
  GET_SHIPPED_PRODUCTS_SUCCESS,
  GET_SHIPPED_PRODUCTS_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = { ...initialState }, { payload, type }) => {
  switch (type) {
    case GET_PRODUCTS_STATISTIC:
      return {
        ...state,
        isStatissticLoad: true
      }
    case GET_PRODUCTS_STATISTIC_SUCCESS:
      return {
        ...state,
        isStatissticLoad: false,
        statistic: payload
      }
    case GET_PRODUCTS_STATISTIC_FAIL:
      return {
        ...state,
        isStatissticLoad: false
      }
    case GET_CREATED_PRODUCTS:
      return {
        ...state,
        isStatissticLoad: true
      }
    case GET_CREATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        isStatissticLoad: false,
        createdTotal: payload
      }
    case GET_CREATED_PRODUCTS_FAIL:
      return {
        ...state,
        isStatissticLoad: false
      }
    case GET_INTO_CIRCULATION_PRODUCTS:
      return {
        ...state,
        isStatissticLoad: true
      }
    case GET_INTO_CIRCULATION_PRODUCTS_SUCCESS:
      return {
        ...state,
        isStatissticLoad: false,
        intoCirculationTotal: payload
      }
    case GET_INTO_CIRCULATION_PRODUCTS_FAIL:
      return {
        ...state,
        isStatissticLoad: false
      }
    case GET_SHIPPED_PRODUCTS:
      return {
        ...state,
        isStatissticLoad: true
      }
    case GET_SHIPPED_PRODUCTS_SUCCESS:
      return {
        ...state,
        isStatissticLoad: false,
        shippedTotal: payload
      }
    case GET_SHIPPED_PRODUCTS_FAIL:
      return {
        ...state,
        isStatissticLoad: false
      }
    default:
      return {
        ...state
      }
  }
}
