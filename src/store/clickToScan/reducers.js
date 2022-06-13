import {
  GET_CAPTURE_LINK,
  GET_CAPTURE_LINK_FAILED,
  GET_CAPTURE_LINK_SUCCESS,
  POST_CAPTURE_LINK,
  DELETE_CAPTURE_LINK_FAILED
} from './actions'
import { initialState } from './selectors'

// eslint-disable-next-line no-unused-vars
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAPTURE_LINK:
      return {
        ...state,
        limit: payload.limit,
        offset: payload.offset - 1 < 0 ? 0 : payload.offset - 1
      }
    case GET_CAPTURE_LINK_SUCCESS:
      return {
        ...state,
        lists: payload.links,
        totalCounts: payload.count
      }
    case GET_CAPTURE_LINK_FAILED: {
      return {
        ...state
      }
    }
    case POST_CAPTURE_LINK: {
      return {
        ...state
      }
    }
    case DELETE_CAPTURE_LINK_FAILED: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
