import { initialState } from './selectors'
import {
  GET_STATUS_ALL_EXPORT_TASKS,
  GET_STATUS_ALL_EXPORT_TASKS_SUCCESS,
  GET_STATUS_ALL_EXPORT_TASKS_FAIL,
  GET_STATUS_EXPORT_TASK,
  GET_STATUS_EXPORT_TASK_SUCCESS,
  GET_STATUS_EXPORT_TASK_FAIL,
  GET_TODO_EXPORT_TASKS,
  GET_TODO_EXPORT_TASKS_SUCCESS,
  GET_TODO_EXPORT_TASKS_FAIL
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STATUS_ALL_EXPORT_TASKS:
      return {
        ...state,
        isTasksForExportLoading: true
      }
    case GET_STATUS_ALL_EXPORT_TASKS_SUCCESS:
      return {
        ...state,
        isTasksForExportLoading: false,
        exportTasksStatus: payload
      }
    case GET_STATUS_ALL_EXPORT_TASKS_FAIL:
      return {
        ...state,
        isTasksForExportLoading: false
      }
    case GET_STATUS_EXPORT_TASK:
      return {
        ...state,
        isTaskForExportLoadingId: payload
      }
    case GET_STATUS_EXPORT_TASK_SUCCESS:
      return {
        ...state,
        isTaskForExportLoadingId: false,
        exportTasksStatus: state.exportTasksStatus.map(el => (el.id === payload.id ? { ...payload } : { ...el }))
      }
    case GET_STATUS_EXPORT_TASK_FAIL:
      return {
        ...state,
        isTaskForExportLoadingId: false
      }
    case GET_TODO_EXPORT_TASKS:
      return {
        ...state,
        isTasksForExportLoading: true
      }
    case GET_TODO_EXPORT_TASKS_SUCCESS:
      return {
        ...state,
        isTasksForExportLoading: false
      }
    case GET_TODO_EXPORT_TASKS_FAIL:
      return {
        ...state,
        isTasksForExportLoading: false
      }
    default:
      return state
  }
}
