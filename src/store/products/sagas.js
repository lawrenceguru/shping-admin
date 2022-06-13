import axios from 'axios'
import { select, takeEvery, put, call, all, delay, takeLatest } from 'redux-saga/effects'
import { INDEX_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import { getTableName, getGdtiTableName } from './selectors'
import * as actions from './actions'
import { getIndexInfo, getParticipantBrands } from '../indexFieldsProducts/sagas'
import { encodeValue } from '../../utils/calculations'

function* getDataForProducts() {
  yield all([call(getIndexInfo), call(getParticipantBrands)])
}

export function* getProductsInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)

    if (!indexSchemaTable) {
      yield call(getDataForProducts)
      indexSchemaTable = yield select(getTableName)
    }

    const param = {
      query: 'id=in=(',
      order: 'name',
      type: 'data'
    }

    if (payload && payload.length) {
      param.query += payload.map(value => `${value},`).reduce((acc, value) => acc + value, '')
    }

    param.query += ')'

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    yield put(
      actions.getProductsInfoSuccess(data.map(item => ({ value: item.id, label: `${item.name} [${item.id}]` })))
    )
  } catch (error) {
    yield put(actions.getProductsInfoFail(error))
  }
}
export function* getProducts(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)
    const data = {
      take: payload.payload.paginationSize,
      skip: payload.payload.skip,
      include_scans: true,
      query: ''
    }

    if (!indexSchemaTable) {
      yield call(getDataForProducts)
      indexSchemaTable = yield select(getTableName)
    }

    if (payload.payload.order) {
      data.order = payload.payload.order
    }

    if (payload.payload.filters) {
      const { filters } = payload.payload
      let query = ''
      Object.keys(payload.payload.filters).forEach(el => {
        const encodedValue = encodeValue(filters[el].value)
        query += `${el}=${filters[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
      })
      data.query = query
    }

    const response = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    yield put(actions.getProductsListSuccess({ products: response.data.data, count: response.data.count }))
  } catch (error) {
    yield put(actions.getProductsListFail(error))
  }
}

export function* getProductsGdti() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getGdtiTableName)

    const { data } = yield call(
      axios.post,
      `${INDEX_API}/rsql/${indexSchemaTable}`,
      {
        order: 'title',
        query: '',
        type: 'count'
      },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )

    const request = {
      order: 'title',
      query: '',
      take: data.count
    }

    if (!indexSchemaTable) {
      yield call(getDataForProducts)
      indexSchemaTable = yield select(getGdtiTableName)
    }

    const response = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, request, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.getProductsGdtiSuccess({ gdti: response.data.data }))
  } catch (error) {
    yield put(actions.getProductsGdtiFail(error))
  }
}

export function* getProductCompleteLike({ payload }) {
  yield delay(300)
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)

    if (!indexSchemaTable) {
      yield call(getIndexInfo)
      indexSchemaTable = yield select(getTableName)
    }

    let param
    if (payload.params) {
      param = {
        query: `id=like=|${payload.searchString}|;name=like=|${payload.searchString}|`,
        order: 'id',
        type: 'data',
        take: 10,
        partner_brand: payload.params.partner_brand,
        op: 'OR'
      }
    } else {
      param = {
        query: `id=like=|${payload}|;name=like=|${payload}|`,
        order: 'id',
        type: 'data',
        take: 10,
        op: 'OR'
      }
    }

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(
      actions.getProductCompleteLikeSuccess(data.map(({ id, name }) => ({ label: `${name || ''} [${id}]`, value: id })))
    )
  } catch (error) {
    yield put(actions.getProductCompleteLikeFail(error))
  }
}

export function* getGdtiForRewardsCompleteLike({ payload }) {
  yield delay(300)
  try {
    const { searchString, partnerBrand } = payload
    const ticket = yield select(fromIdentity.getTicket)

    const param = {
      query: `id=like=|${searchString}|;name=like=|${searchString}|`,
      order: 'id',
      type: 'data',
      take: 10,
      partner_brand: partnerBrand,
      op: 'OR'
    }

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/gtin`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(
      actions.getProductCompleteLikeSuccess(data.map(({ id, name }) => ({ label: `${name || ''} [${id}]`, value: id })))
    )
  } catch (error) {
    yield put(actions.getProductCompleteLikeFail(error))
  }
}

export function* getGdtiCompleteLike({ payload }) {
  yield delay(300)
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getGdtiTableName)

    if (!indexSchemaTable) {
      yield call(getDataForProducts)
      indexSchemaTable = yield select(getGdtiTableName)
    }

    const param = {
      query: `title=like=|${payload}|`,
      order: 'id',
      type: 'data',
      take: 10,
      op: 'OR'
    }

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.getGdtiCompleteLikeSuccess(data.map(({ id, title }) => ({ label: title, value: id }))))
  } catch (error) {
    yield put(actions.getGdtiCompleteLikeFail(error))
  }
}

export function* getGdtiInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)

    if (!indexSchemaTable) {
      yield call(getDataForProducts)
      indexSchemaTable = yield select(getGdtiTableName)
    }

    const param = {
      query: 'id=in=(',
      order: 'id',
      type: 'data'
    }

    if (payload && payload.length) {
      param.query += payload.map(value => `${value},`).reduce((acc, value) => acc + value, '')
    }

    param.query += ')'

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    yield put(actions.getGdtiInfoSuccess(data.map(({ id, title }) => ({ value: id, label: title }))))
  } catch (error) {
    yield put(actions.getGdtiInfoFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_PRODUCTS_LIST, getProducts)
  yield takeEvery(actions.GET_PRODUCTS_GDTI, getProductsGdti)
  yield takeLatest(actions.GET_PRODUCT_COMPLETE_LIKE, getProductCompleteLike)
  yield takeEvery(actions.GET_PRODUCTS_INFO, getProductsInfo)
  yield takeLatest(actions.GET_GDTI_COMPLETE_LIKE, getGdtiCompleteLike)
  yield takeEvery(actions.GET_GDTI_INFO, getGdtiInfo)
  yield takeLatest(actions.GET_GDTI_FOR_REWARDS_COMPLETE_LIKE, getGdtiForRewardsCompleteLike)
}
