import { GET_DOCUMENTS, GET_DOCUMENTS_SUCCESS, GET_DOCUMENTS_FAIL } from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        isLoading: true,
        isSave: false,
        editId: null
      }
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: payload.data,
        count: payload.count,
        isLoading: false
      }
    case GET_DOCUMENTS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
