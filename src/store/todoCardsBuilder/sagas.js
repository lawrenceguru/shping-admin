import { call, put, select, takeEvery } from 'redux-saga/effects'
import { TODO_CARDS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* getTodoCards() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(() =>
      axios.get(`${TODO_CARDS_API}/cards`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoGetTodoCardsSuccess(data))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoGetTodoCardsFail(error))
  }
}

export function* deleteTodoCards({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(() =>
      axios.delete(`${TODO_CARDS_API}/cards/${payload}`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoDeleteTodoCardsSuccess(data))
    toast.success('The toDo card was successfully deleted')
    yield put(actions.todoGetTodoCards())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoDeleteTodoCardsFail(error))
  }
}

export function* createTodoCards({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(() =>
      axios.post(`${TODO_CARDS_API}/cards`, payload, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoCreateTodoCardsSuccess())
    toast.success('The toDo card was successfully created')
    yield put(actions.todoGetTodoCards())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoCreateTodoCardsFail(error))
  }
}

export function* updateTodoCards({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { id, data } = payload

    yield call(() =>
      axios.put(`${TODO_CARDS_API}/cards/${id}`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoUpdateTodoCardsSuccess())
    toast.success('The toDo card was successfully updated')
    yield put(actions.todoGetTodoCards())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoUpdateTodoCardsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_TODO_CARDS, getTodoCards)
  yield takeEvery(actions.DELETE_TODO_CARDS, deleteTodoCards)
  yield takeEvery(actions.CREATE_TODO_CARDS, createTodoCards)
  yield takeEvery(actions.UPDATE_TODO_CARDS, updateTodoCards)
}
