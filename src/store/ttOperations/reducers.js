import { initialState } from './selectors'
import { GET_OPERATIONS, GET_OPERATIONS_SUCCESS, GET_OPERATIONS_FAIL } from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_OPERATIONS:
      return {
        ...state,
        isLoading: true
      }
    case GET_OPERATIONS_SUCCESS:
      return {
        ...state,
        all: payload.data,
        limit: payload.limit,
        isLoading: false,
        sortOrder: payload.sort_order
      }
    case GET_OPERATIONS_FAIL:
      return {
        ...state,
        textTypes: [],
        isLoading: false
      }
    default:
      return state
  }
}
