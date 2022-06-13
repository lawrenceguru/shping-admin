import { initialState } from './selectors'
import {
  GET_TODO_DELIVERIES,
  GET_TODO_DELIVERIES_SUCCESS,
  GET_TODO_DELIVERIES_FAIL,
  DELETE_TODO_DELIVERY,
  DELETE_TODO_DELIVERY_SUCCESS,
  DELETE_TODO_DELIVERY_FAIL,
  SET_STATUS_TODO_DELIVERY,
  SET_STATUS_TODO_DELIVERY_SUCCESS,
  SET_STATUS_TODO_DELIVERY_FAIL,
  CREATE_TODO_DELIVERY,
  CREATE_TODO_DELIVERY_FAIL,
  CREATE_TODO_DELIVERY_SUCCESS,
  UPDATE_TODO_DELIVERY,
  UPDATE_TODO_DELIVERY_SUCCESS,
  UPDATE_TODO_DELIVERY_FAIL,
  SELECT_TODO_DELIVERY,
  CLEAR_SELECTED_TODO_DELIVERY,
  GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY,
  GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_SUCCESS,
  GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_FAIL,
  GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY,
  GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_SUCCESS,
  GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_FAIL,
  CLEAR_CONVERTED_BUDGET
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TODO_DELIVERIES:
      return {
        ...state,
        isTodoDeliveriesLoading: true,
        updated: false
      }
    case GET_TODO_DELIVERIES_SUCCESS:
      return {
        ...state,
        isTodoDeliveriesLoading: false,
        todoDeliveries: payload
      }
    case GET_TODO_DELIVERIES_FAIL:
      return {
        ...state,
        isTodoDeliveriesLoading: false
      }
    case GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY:
      return {
        ...state
      }
    case GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        convertedBudget: payload
      }
    case GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY_FAIL:
      return {
        ...state
      }
    case GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY:
      return {
        ...state
      }
    case GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        points: payload
      }
    case GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY_FAIL:
      return {
        ...state
      }
    case SELECT_TODO_DELIVERY:
      return {
        ...state,
        editItemId: payload
      }
    case CLEAR_SELECTED_TODO_DELIVERY:
      return {
        ...state,
        editItemId: null
      }

    case DELETE_TODO_DELIVERY:
      return {
        ...state,
        isTodoDeliveryDeleting: true
      }
    case DELETE_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        isTodoDeliveryDeleting: false
      }
    case DELETE_TODO_DELIVERY_FAIL:
      return {
        ...state,
        isTodoDeliveryDeleting: false
      }

    case CREATE_TODO_DELIVERY:
      return {
        ...state,
        isTodoDeliveryCreating: true,
        updated: false
      }
    case CREATE_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        isTodoDeliveryCreating: false,
        updated: true
      }
    case CREATE_TODO_DELIVERY_FAIL:
      return {
        ...state,
        isTodoDeliveryCreating: false,
        updated: false
      }
    case UPDATE_TODO_DELIVERY:
      return {
        ...state,
        isTodoDeliveryUpdating: true,
        updated: false
      }
    case UPDATE_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        isTodoDeliveryUpdating: false,
        updated: true
      }
    case UPDATE_TODO_DELIVERY_FAIL:
      return {
        ...state,
        isTodoDeliveryUpdating: false,
        updated: false
      }

    case SET_STATUS_TODO_DELIVERY:
      return {
        ...state,
        isTodoDeliveryUpdating: true
      }
    case SET_STATUS_TODO_DELIVERY_SUCCESS:
      return {
        ...state,
        isTodoDeliveryUpdating: false
      }
    case SET_STATUS_TODO_DELIVERY_FAIL:
      return {
        ...state,
        isTodoDeliveryUpdating: false
      }
    case CLEAR_CONVERTED_BUDGET:
      return {
        ...state,
        convertedBudget: 0,
        points: null
      }
    default:
      return state
  }
}
