export const GET_TODO_DELIVERIES = 'todo/GET_TODO_DELIVERIES'
export const GET_TODO_DELIVERIES_SUCCESS = 'todo/GET_TODO_DELIVERIES_SUCCESS'
export const GET_TODO_DELIVERIES_FAIL = 'todo/GET_TODO_DELIVERIES_FAIL'

export const DELETE_TODO_DELIVERY = 'todo/DELETE_TODO_DELIVERY'
export const DELETE_TODO_DELIVERY_SUCCESS = 'todo/DELETE_TODO_DELIVERY_SUCCESS'
export const DELETE_TODO_DELIVERY_FAIL = 'todo/DELETE_TODO_DELIVERY_FAIL'

export const CREATE_TODO_DELIVERY = 'todo/CREATE_TODO_DELIVERY'
export const CREATE_TODO_DELIVERY_SUCCESS = 'todo/CREATE_TODO_DELIVERY_SUCCESS'
export const CREATE_TODO_DELIVERY_FAIL = 'todo/CREATE_TODO_DELIVERY_FAIL'

export const UPDATE_TODO_DELIVERY = 'todo/UPDATE_TODO_DELIVERY'
export const UPDATE_TODO_DELIVERY_SUCCESS = 'todo/UPDATE_TODO_DELIVERY_SUCCESS'
export const UPDATE_TODO_DELIVERY_FAIL = 'todo/UPDATE_TODO_DELIVERY_FAIL'

export const SET_STATUS_TODO_DELIVERY = 'todo/SET_STATUS_TODO_DELIVERY'
export const SET_STATUS_TODO_DELIVERY_SUCCESS = 'todo/SET_STATUS_TODO_DELIVERY_SUCCESS'
export const SET_STATUS_TODO_DELIVERY_FAIL = 'todo/SET_STATUS_TODO_DELIVERY_FAIL'

export const SELECT_TODO_DELIVERY = 'todo/SELECT_TODO_DELIVERY'
export const CLEAR_SELECTED_TODO_DELIVERY = 'todo/CLEAR_SELECTED_TODO_DELIVERY'

export const GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY = 'todo/GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY'
export const GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_SUCCESS = 'todo/GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_SUCCESS'
export const GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_FAIL = 'todo/GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_FAIL'

export const GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY = 'todo/GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY'
export const GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_SUCCESS =
  'todo/GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_SUCCESS'
export const GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_FAIL =
  'todo/GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_FAIL'

export const CLEAR_CONVERTED_BUDGET = 'todo/CLEAR_CONVERTED_BUDGET'

export const todoGetTodoDeliveries = () => ({
  type: GET_TODO_DELIVERIES
})

export const todoGetTodoDeliveriesSuccess = payload => ({
  type: GET_TODO_DELIVERIES_SUCCESS,
  payload
})

export const todoGetTodoDeliveriesFail = payload => ({
  type: GET_TODO_DELIVERIES_FAIL,
  payload
})

export const todoGetAdjustmentBudgetRateTodoDelivery = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY,
  payload
})

export const todoGetAdjustmentBudgetRateTodoSuccess = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoGetAdjustmentBudgetRateTodoDeliveryFail = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_FAIL,
  payload
})

export const todoGetAdjustmentConvertedBudgetTodoDelivery = payload => ({
  type: GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY,
  payload
})

export const todoGetAdjustmentConvertedBudgetTodoDeliverySuccess = payload => ({
  type: GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoGetAdjustmentConvertedBudgetTodoDeliveryFail = payload => ({
  type: GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_FAIL,
  payload
})

export const todoClearConvertedBudget = () => ({
  type: CLEAR_CONVERTED_BUDGET
})

export const todoSelectTodoDelivery = payload => ({
  type: SELECT_TODO_DELIVERY,
  payload
})

export const todoClearSelectedTodoDelivery = payload => ({
  type: CLEAR_SELECTED_TODO_DELIVERY,
  payload
})

export const todoDeleteTodoDelivery = payload => ({
  type: DELETE_TODO_DELIVERY,
  payload
})

export const todoDeleteTodoDeliverySuccess = payload => ({
  type: DELETE_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoDeleteTodoDeliveryFail = payload => ({
  type: DELETE_TODO_DELIVERY_FAIL,
  payload
})

export const todoCreateTodoDelivery = payload => ({
  type: CREATE_TODO_DELIVERY,
  payload
})

export const todoCreateTodoDeliverySuccess = payload => ({
  type: CREATE_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoCreateTodoDeliveryFail = payload => ({
  type: CREATE_TODO_DELIVERY_FAIL,
  payload
})

export const todoSetStatusTodoDelivery = payload => ({
  type: SET_STATUS_TODO_DELIVERY,
  payload
})

export const todoSetStatusTodoDeliverySuccess = payload => ({
  type: SET_STATUS_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoSetStatusTodoDeliveryFail = payload => ({
  type: SET_STATUS_TODO_DELIVERY_FAIL,
  payload
})

export const todoUpdateTodoDelivery = payload => ({
  type: UPDATE_TODO_DELIVERY,
  payload
})

export const todoUpdateTodoDeliverySuccess = payload => ({
  type: UPDATE_TODO_DELIVERY_SUCCESS,
  payload
})

export const todoUpdateTodoDeliveryFail = payload => ({
  type: UPDATE_TODO_DELIVERY_FAIL,
  payload
})
