import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { INDEX_API } from 'constants/url'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import * as actions from './actions'
import { getSlgtinTableName } from './selectors'
import { getIndexInfo } from '../indexFieldsSerialization/sagas'
import { encodeValue } from '../../utils/calculations'

export function* postProducts(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getSlgtinTableName)

    const data = {
      take: payload.payload.paginationSize,
      skip: payload.payload.skip,
      include_scans: true,
      query: ''
    }

    if (!indexSchemaTable || Object.keys(indexSchemaTable).length === 0) {
      yield call(getIndexInfo)
      indexSchemaTable = yield select(getSlgtinTableName)
    }

    if (payload.payload.order) {
      data.order = payload.payload.order
    }

    if (payload.payload.filters) {
      const { filters } = payload.payload
      let query = ''
      Object.keys(payload.payload.filters).forEach(el => {
        const encodedValue = encodeValue(filters[el].value)
        if (el === 'date_created') {
          const startTime = moment(encodedValue)
            .utc()
            .add(12, 'hours')
            .startOf('day')
            .toISOString()
          const endTime = moment(encodedValue)
            .endOf('day')
            .toISOString()
          query += `date_created=ge=${startTime};date_created=le=${endTime};`
        } else if (el === 'id') {
          query += `gtin=${filters[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
        } else if (el === 'owner_select') {
          query += `custody${filters[el].option ? '=' : '!'}=${filters[el].value};custody${
            filters[el].option ? '=' : '!'
          }=null`
          data.op = filters[el].option ? 'OR' : 'AND'
        } else if (el === 'serial_number') {
          const shieldedValue = filters[el].value.replace(/"/g, `\\$&`)
          // eslint-disable-next-line no-useless-escape
          query += `${el}=${filters[el].option ? 'like=' : 'unlike='}|\"${shieldedValue}\"|;`
        } else if (['into_circulation', 'circulation_status'].includes(el) && filters[el].value === 'null') {
          query += `${el}=null;`
        } else {
          query += `${el}=${filters[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
        }
      })
      data.query = query
    }

    const response = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, data, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (data) {
      yield put(actions.serializedProductsGetProductsSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.serializedProductsGetProductsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.POST_PRODUCTS, postProducts)
}
