import { call, put, select, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { TODO_CARDS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from './actions'
import { toReadableNumber } from '../../utils/helpers/mathOperations'

// eslint-disable-next-line camelcase,require-yield
export function* getAdjustmentBudgetRate({ payload }) {
  const ticket = yield select(fromIdentity.getTicket)
  yield delay(300)
  try {
    // eslint-disable-next-line camelcase
    const { result, coins_step } = payload

    const adjustment = {
      adjustment: {
        result: parseFloat(result),
        coins_step
      }
    }

    const { data } = yield call(() =>
      axios.post(`${TODO_CARDS_API}/adjustment/get`, adjustment, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoGetAdjustmentBudgetRateTodoSuccess(toReadableNumber(data.result, 3)))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put({
      type: actions.todoUpdateTodoDeliveryFail(),
      error
    })
  }
}

// eslint-disable-next-line camelcase,no-unused-vars
export function* getAdjustmentConvertedBudget({ payload: { result, coins_step, maximum } }) {
  yield delay(300)
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const adjustment = {
      adjustment: {
        result: parseFloat(result),
        coins_step
      }
    }

    const { data } = yield call(() =>
      axios.post(`${TODO_CARDS_API}/adjustment/get`, adjustment, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    const converted = parseFloat(maximum) * (parseFloat(result) / parseFloat(data.result))
    yield put(actions.todoGetAdjustmentConvertedBudgetTodoDeliverySuccess(converted))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoGetAdjustmentConvertedBudgetTodoDeliveryFail(error))
  }
}

export function* getTodoDeliveries() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(() =>
      axios.get(`${TODO_CARDS_API}/deliveries`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoGetTodoDeliveriesSuccess(data))
  } catch (error) {
    yield put(actions.todoGetTodoDeliveriesFail(error))
  }
}

export function* createTodoDelivery({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(() =>
      axios.post(`${TODO_CARDS_API}/deliveries`, payload, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoCreateTodoDeliverySuccess())
    toast.success('The toDo card was successfully created')
    yield put(actions.todoGetTodoDeliveries())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoCreateTodoDeliveryFail(error))
  }
}

export function* updateTodoDelivery({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { id, data } = payload

    yield call(() =>
      axios.put(`${TODO_CARDS_API}/deliveries/${id}`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoUpdateTodoDeliverySuccess())
    toast.success('The toDo card was successfully updated')
    yield put(actions.todoGetTodoDeliveries())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoUpdateTodoDeliveryFail(error))
  }
}

export function* deleteTodoDelivery({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(() =>
      axios.delete(`${TODO_CARDS_API}/deliveries/${payload}`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.todoDeleteTodoDeliverySuccess(data))
    yield put(actions.todoGetTodoDeliveries())
    toast.success('The delivery was successfully deleted')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoDeleteTodoDeliveryFail(error))
  }
}

export function* setStatusTodoDelivery({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { id, status } = payload
    const { data } = yield call(() =>
      axios.put(
        `${TODO_CARDS_API}/deliveries/status/${id}`,
        { status },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
    )

    yield put(actions.todoSetStatusTodoDeliverySuccess(data))
    if (status === 'active') {
      toast.success(`The delivery was successfully activated`)
    }

    yield put(actions.todoGetTodoDeliveries())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.todoSetStatusTodoDeliveryFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_TODO_DELIVERIES, getTodoDeliveries)
  yield takeEvery(actions.DELETE_TODO_DELIVERY, deleteTodoDelivery)
  yield takeEvery(actions.CREATE_TODO_DELIVERY, createTodoDelivery)
  yield takeEvery(actions.UPDATE_TODO_DELIVERY, updateTodoDelivery)
  yield takeLatest(actions.GET_ADJUSTMENT_BUDGET_RATE_TODO_DELIVERY, getAdjustmentBudgetRate)
  yield takeLatest(actions.GET_ADJUSTMENT_CONVERTED_BUDGET_TODO_DELIVERY, getAdjustmentConvertedBudget)
  yield takeEvery(actions.SET_STATUS_TODO_DELIVERY, setStatusTodoDelivery)
}
