import { initialState } from './selectors'
import {
  GET_TODO_CARDS,
  GET_TODO_CARDS_SUCCESS,
  GET_TODO_CARDS_FAIL,
  DELETE_TODO_CARDS,
  DELETE_TODO_CARDS_SUCCESS,
  DELETE_TODO_CARDS_FAIL,
  CREATE_TODO_CARDS,
  CREATE_TODO_CARDS_SUCCESS,
  CREATE_TODO_CARDS_FAIL,
  UPDATE_TODO_CARDS,
  UPDATE_TODO_CARDS_SUCCESS,
  UPDATE_TODO_CARDS_FAIL,
  SELECT_TODO_CARD,
  CLEAR_SELECTED_TODO_CARD
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TODO_CARDS:
      return {
        ...state,
        isTodoCardsLoading: true,
        updated: false
      }
    case GET_TODO_CARDS_SUCCESS:
      return {
        ...state,
        isTodoCardsLoading: false,
        todoCards: payload
      }
    case GET_TODO_CARDS_FAIL:
      return {
        ...state,
        isTodoCardsLoading: false
      }
    case SELECT_TODO_CARD:
      return {
        ...state,
        editItemId: payload
      }
    case CLEAR_SELECTED_TODO_CARD:
      return {
        ...state,
        editItemId: null
      }
    case DELETE_TODO_CARDS:
      return {
        ...state,
        isTodoCardsDeleting: true
      }
    case DELETE_TODO_CARDS_SUCCESS:
      return {
        ...state,
        isTodoCardsDeleting: false
      }
    case DELETE_TODO_CARDS_FAIL:
      return {
        ...state,
        isTodoCardsDeleting: false
      }
    case CREATE_TODO_CARDS:
      return {
        ...state,
        isTodoCardsCreating: true,
        updated: false
      }
    case CREATE_TODO_CARDS_SUCCESS:
      return {
        ...state,
        isTodoCardsCreating: false,
        updated: true
      }
    case CREATE_TODO_CARDS_FAIL:
      return {
        ...state,
        isTodoCardsCreating: false,
        updated: false
      }
    case UPDATE_TODO_CARDS:
      return {
        ...state,
        isTodoCardsUpdating: true,
        updated: false
      }
    case UPDATE_TODO_CARDS_SUCCESS:
      return {
        ...state,
        isTodoCardsUpdating: false,
        updated: true
      }
    case UPDATE_TODO_CARDS_FAIL:
      return {
        ...state,
        isTodoCardsUpdating: false,
        updated: false
      }
    default:
      return state
  }
}
