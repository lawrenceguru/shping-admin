import {
  GET_IMPORT_STATUS,
  GET_IMPORT_STATUS_SUCCESS,
  GET_IMPORT_STATUS_FAIL,
  GET_IMPORT_STATUSES,
  GET_IMPORT_STATUSES_SUCCESS,
  GET_IMPORT_STATUSES_FAIL,
  POST_PREVIEW,
  POST_PREVIEW_SUCCESS,
  POST_PREVIEW_FAIL,
  POST_IMPORT_START,
  POST_IMPORT_START_SUCCESS,
  POST_IMPORT_START_FAIL,
  POST_FILE,
  PUT_COLUMN,
  CLEAR_PREVIEW,
  PUT_ROWS
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_IMPORT_STATUSES:
      return {
        ...state,
        isImportLoading: true
      }
    case GET_IMPORT_STATUSES_SUCCESS:
      return {
        ...state,
        isImportLoading: false,
        importStatus: payload
      }
    case GET_IMPORT_STATUSES_FAIL:
      return {
        ...state,
        isImportLoading: false
      }
    case GET_IMPORT_STATUS:
      return {
        ...state,
        importStatus: {
          tasks:
            state.importStatus &&
            state.importStatus.tasks.map(task => ({
              ...task,
              loading: payload === task.id
            }))
        }
      }
    case GET_IMPORT_STATUS_SUCCESS:
      return {
        ...state,
        importStatus: {
          tasks:
            state.importStatus &&
            state.importStatus.tasks.map(task => ({
              ...(payload.id === task.id ? payload : task),
              loading: false
            }))
        }
      }
    case GET_IMPORT_STATUS_FAIL:
      return {
        ...state
      }
    case POST_PREVIEW:
      return {
        ...state,
        ...initialState,
        isImportLoading: true
      }
    case POST_PREVIEW_SUCCESS:
      return {
        ...state,
        isImportLoading: false,
        preview: payload && {
          ...payload,
          rows: payload.rows && payload.rows.length > 7 ? payload.rows.slice(0, 7) : payload.rows
        }
      }
    case POST_PREVIEW_FAIL:
      return {
        ...state,
        isImportLoading: false
      }
    case POST_IMPORT_START:
      return {
        ...state,
        updated: false,
        isImportLoading: true
      }
    case POST_IMPORT_START_SUCCESS:
      return {
        ...state,
        updated: true,
        isImportLoading: false
      }
    case POST_IMPORT_START_FAIL:
      return {
        ...state,
        updated: false,
        isImportLoading: false
      }
    case PUT_COLUMN:
      return {
        ...state,
        preview: {
          ...state.preview,
          header: payload
        }
      }
    case PUT_ROWS:
      return {
        ...state,
        preview: {
          ...state.preview,
          rows: payload
        }
      }
    case POST_FILE:
      return {
        ...state,
        allInfo: payload.allInfo
      }
    case CLEAR_PREVIEW:
      return {
        ...state,
        preview: null,
        updated: false
      }
    default:
      return state
  }
}
