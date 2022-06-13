export const GET_TODO_EXPORT_TASKS = 'todo/GET_TODO_EXPORT_TASKS'
export const GET_TODO_EXPORT_TASKS_SUCCESS = 'todo/GET_TODO_EXPORT_TASKS_SUCCESS'
export const GET_TODO_EXPORT_TASKS_FAIL = 'todo/GET_TODO_EXPORT_TASKS_FAIL'

export const GET_STATUS_EXPORT_TASK = 'todo/GET_STATUS_EXPORT_TASK'
export const GET_STATUS_EXPORT_TASK_SUCCESS = 'todo/GET_STATUS_EXPORT_TASK_SUCCESS'
export const GET_STATUS_EXPORT_TASK_FAIL = 'todo/GET_STATUS_EXPORT_TASK_FAIL'

export const GET_STATUS_ALL_EXPORT_TASKS = 'todo/GET_STATUS_ALL_EXPORT_TASKS'
export const GET_STATUS_ALL_EXPORT_TASKS_SUCCESS = 'todo/GET_STATUS_ALL_EXPORT_TASKS_SUCCESS'
export const GET_STATUS_ALL_EXPORT_TASKS_FAIL = 'todo/GET_STATUS_ALL_EXPORT_TASKS_FAIL'

export const todoGetTodoExportTasks = payload => ({
  type: GET_TODO_EXPORT_TASKS,
  payload
})

export const todoGetTodoExportTasksSuccess = payload => ({
  type: GET_TODO_EXPORT_TASKS_SUCCESS,
  payload
})

export const todoGetTodoExportTasksFail = payload => ({
  type: GET_TODO_EXPORT_TASKS_FAIL,
  payload
})

export const todoGetStatusExportTask = payload => ({
  type: GET_STATUS_EXPORT_TASK,
  payload
})

export const todoGetStatusExportTaskSuccess = payload => ({
  type: GET_STATUS_EXPORT_TASK_SUCCESS,
  payload
})

export const todoGetStatusExportTaskFail = payload => ({
  type: GET_STATUS_EXPORT_TASK_FAIL,
  payload
})

export const todoGetStatusAllExportTasks = () => ({
  type: GET_STATUS_ALL_EXPORT_TASKS
})

export const todoGetStatusAllExportTasksSuccess = payload => ({
  type: GET_STATUS_ALL_EXPORT_TASKS_SUCCESS,
  payload
})

export const todoGetStatusAllExportTasksFail = payload => ({
  type: GET_STATUS_ALL_EXPORT_TASKS_FAIL,
  payload
})
