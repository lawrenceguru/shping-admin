import { POST_PRODUCTS, POST_PRODUCTS_SUCCESS, POST_PRODUCTS_FAIL, SET_PRODUCTS_ORDER } from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_PRODUCTS:
      return {
        ...state,
        isLoadingSerializedProducts: true
      }
    case POST_PRODUCTS_SUCCESS:
      return {
        ...state,
        count: payload.count,
        products: payload.data,
        isLoadingSerializedProducts: false
      }
    case POST_PRODUCTS_FAIL:
      return {
        ...state,
        count: null,
        products: [],
        isLoadingSerializedProducts: false
      }
    case SET_PRODUCTS_ORDER:
      return {
        ...state,
        order: payload
      }
    default:
      return state
  }
}
