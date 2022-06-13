export const GET_TODO_CARDS = 'todo/GET_TODO_CARDS'
export const GET_TODO_CARDS_SUCCESS = 'todo/GET_TODO_CARDS_SUCCESS'
export const GET_TODO_CARDS_FAIL = 'todo/GET_TODO_CARDS_FAIL'

export const DELETE_TODO_CARDS = 'todo/DELETE_TODO_CARDS'
export const DELETE_TODO_CARDS_SUCCESS = 'todo/DELETE_TODO_CARDS_SUCCESS'
export const DELETE_TODO_CARDS_FAIL = 'todo/DELETE_TODO_CARDS_FAIL'

export const SELECT_TODO_CARD = 'todo/SELECT_TODO_CARD'

export const CREATE_TODO_CARDS = 'todo/CREATE_TODO_CARDS'
export const CREATE_TODO_CARDS_SUCCESS = 'todo/CREATE_TODO_CARDS_SUCCESS'
export const CREATE_TODO_CARDS_FAIL = 'todo/CREATE_TODO_CARDS_FAIL'

export const UPDATE_TODO_CARDS = 'todo/UPDATE_TODO_CARDS'
export const UPDATE_TODO_CARDS_SUCCESS = 'todo/UPDATE_TODO_CARDS_SUCCESS'
export const UPDATE_TODO_CARDS_FAIL = 'todo/UPDATE_TODO_CARDS_FAIL'

export const CLEAR_SELECTED_TODO_CARD = 'todo/CLEAR_SELECTED_TODO_CARD'

export const todoGetTodoCards = () => ({
  type: GET_TODO_CARDS
})

export const todoSelectTodoCard = payload => ({
  type: SELECT_TODO_CARD,
  payload
})

export const todoClearSelectedTodoCard = payload => ({
  type: CLEAR_SELECTED_TODO_CARD,
  payload
})

export const todoGetTodoCardsSuccess = payload => ({
  type: GET_TODO_CARDS_SUCCESS,
  payload
})

export const todoGetTodoCardsFail = payload => ({
  type: GET_TODO_CARDS_FAIL,
  payload
})

export const todoDeleteTodoCards = payload => ({
  type: DELETE_TODO_CARDS,
  payload
})

export const todoDeleteTodoCardsSuccess = payload => ({
  type: DELETE_TODO_CARDS_SUCCESS,
  payload
})

export const todoDeleteTodoCardsFail = payload => ({
  type: DELETE_TODO_CARDS_FAIL,
  payload
})

export const todoCreateTodoCards = payload => ({
  type: CREATE_TODO_CARDS,
  payload
})

export const todoCreateTodoCardsSuccess = payload => ({
  type: CREATE_TODO_CARDS_SUCCESS,
  payload
})

export const todoCreateTodoCardsFail = payload => ({
  type: CREATE_TODO_CARDS_FAIL,
  payload
})

export const todoUpdateTodoCards = payload => ({
  type: UPDATE_TODO_CARDS,
  payload
})

export const todoUpdateTodoCardsSuccess = payload => ({
  type: UPDATE_TODO_CARDS_SUCCESS,
  payload
})

export const todoUpdateTodoCardsFail = payload => ({
  type: UPDATE_TODO_CARDS_FAIL,
  payload
})
