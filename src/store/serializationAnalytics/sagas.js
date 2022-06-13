import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { SERIALIZE_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'
import { filters } from './selectors'
// eslint-disable-next-line no-unused-vars
import { chartDateMapping } from '../../utils/campaign'
import { getTotalFromArray, getArrayWithDataFromStatistic } from '../../utils/serializedAnalytics'

function getSelectorsData(selectors) {
  const data = {
    date_from: selectors.fromDate,
    date_to: selectors.toDate
  }

  if (selectors.issuer !== 'any') {
    data.issuer = selectors.issuer
  }

  return data
}

export function* postProductsStatistic() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(filters)
    const data = getSelectorsData(selectors)
    data.date_as = selectors.dateAs
    data.ret_type = 'filtered'

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/analytic`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(
      actions.serializationGetProductsStatisticSuccess(
        getArrayWithDataFromStatistic(response.data.data, selectors.dateAs)
      )
    )
  } catch (error) {
    yield put(actions.serializationGetProductsStatisticFail(error))
  }
}

export function* postCreatedProductsTotal() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(filters)
    const data = getSelectorsData(selectors)
    data.ret_type = 'total'
    data.type = ['created']

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/analytic`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.serializationGetCreatedProductsSuccess(getTotalFromArray(response.data.data, 'created')))
  } catch (error) {
    yield put(actions.serializationGetCreatedProductsFail(error))
  }
}

export function* postIntoCirculationProductsTotal() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(filters)
    const data = getSelectorsData(selectors)
    data.ret_type = 'total'
    data.type = ['into_circulation']

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/analytic`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(
      actions.serializationGetIntoCirculationProductsSuccess(getTotalFromArray(response.data.data, 'into_circulation'))
    )
  } catch (error) {
    yield put(actions.serializationGetIntoCirculationProductsFail(error))
  }
}

export function* postShippedProductsTotal() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(filters)
    const data = getSelectorsData(selectors)
    data.ret_type = 'total'
    data.type = ['shipped']

    const response = yield call(() =>
      axios.post(`${SERIALIZE_API}/analytic`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.serializationGetShippedProductsSuccess(getTotalFromArray(response.data.data, 'shipped')))
  } catch (error) {
    yield put(actions.serializationGetShippedProductsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_PRODUCTS_STATISTIC, postProductsStatistic)
  yield takeEvery(actions.GET_CREATED_PRODUCTS, postCreatedProductsTotal)
  yield takeEvery(actions.GET_INTO_CIRCULATION_PRODUCTS, postIntoCirculationProductsTotal)
  yield takeEvery(actions.GET_SHIPPED_PRODUCTS, postShippedProductsTotal)
}
