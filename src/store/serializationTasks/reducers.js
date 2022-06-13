import { initialState } from './selectors'
import {
  GET_SERIALIZATION,
  GET_SERIALIZATION_FAIL,
  GET_SERIALIZATION_SUCCESS,
  GET_SERIALIZATION_LENGTH_SUCCESS,
  SERIALIZE_GET_SSCC_TASKS_STATUS,
  SERIALIZE_GET_SSCC_TASKS_STATUS_SUCCESS,
  SERIALIZE_GET_SSCC_TASKS_STATUS_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SERIALIZATION:
      return {
        ...state,
        isLoading: true
      }
    case GET_SERIALIZATION_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_SERIALIZATION_LENGTH_SUCCESS:
      return {
        ...state,
        isLoading: true,
        totalItems: payload.serialization_list && payload.serialization_list.length
      }
    case GET_SERIALIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offset: payload.offset,
        all: payload.serialization_list
      }
    case SERIALIZE_GET_SSCC_TASKS_STATUS:
      return {
        ...state,
        ssccTasksIsLoading: true
      }
    case SERIALIZE_GET_SSCC_TASKS_STATUS_SUCCESS:
      return {
        ...state,
        ssccTasksIsLoading: false,
        ssccTasks: payload
      }
    case SERIALIZE_GET_SSCC_TASKS_STATUS_FAIL:
      return {
        ...state,
        ssccTasksIsLoading: false
      }
    default:
      return state
  }
}
