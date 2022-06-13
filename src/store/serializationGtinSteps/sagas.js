import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { toast } from 'react-toastify'
import { INDEX_API, SERIALIZE_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import { push } from 'connected-react-router'
import * as actions from './actions'
import { encodeValue } from '../../utils/calculations'

export const getSlgtinTableName = state =>
  (state.index && state.index.tableName) || localStorage.getItem('indexTableName')

const prepareData = payload => {
  let data = { skip: payload.skip, take: payload.take }
  if (payload.query || payload.query === '') {
    const filterQuery = payload.query
    let query = ''
    Object.keys(payload.query).forEach(el => {
      const encodedValue = encodeValue(filterQuery[el].value)
      query += `${el}=${filterQuery[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
    })
    const op =
      (Object.keys(payload.query) && Object.keys(payload.query).length > 1) || (query && query.includes('ts'))
        ? 'AND'
        : ''
    data = { ...data, query, ...(!op ? null : { op }) }
  }
  return data
}

export function* generateSSCCTasks({ payload }) {
  try {
    const data = prepareData(payload)
    const indexSchemaTable = yield select(getSlgtinTableName)

    const ticket = yield select(fromIdentity.getTicket)
    const response = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.serializationGetGtinSelectSuccess(response && response.data))
  } catch (error) {
    yield put(actions.serializationGetGtinSelectFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export function* generateGTINTasks({ payload }) {
  try {
    const data = payload.values

    const ticket = yield select(fromIdentity.getTicket)
    const response = yield call(axios.post, `${SERIALIZE_API}/serialize`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    yield put(actions.serializationGetGtinValuesSuccess(response && response.data))
    yield put(push('/admin/track-and-trace/serialization-tasks'))

    toast.success(`${payload.values.name} task was successfully created`)
  } catch (error) {
    yield put(actions.serializationGetGtinValuesFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.POST_SERIALIZATION_GTIN_SELECT, generateSSCCTasks)
  yield takeEvery(actions.POST_SERIALIZATION_GTIN_VALUES, generateGTINTasks)
}
