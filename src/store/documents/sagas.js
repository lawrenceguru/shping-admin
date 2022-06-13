import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { fromIdentity } from 'store/selectors'
import { INDEX_API } from 'constants/url'
import { getTableName, getParticipants } from './selectors'
import { getIndexInfo } from '../indexFieldsDocuments/sagas'
import * as actions from './actions'
import 'react-toastify/dist/ReactToastify.css'
import { encodeValue } from '../../utils/calculations'
import { getOwnerFilter } from '../../utils/getOwnerQueryString'

export function* getDocuments({ payload: { paginationSize, skip, order, filters } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)
    const requestData = {
      take: paginationSize,
      skip,
      query: ''
    }

    if (order) {
      requestData.order = order
    }

    if (!indexSchemaTable) {
      yield call(getIndexInfo)
      indexSchemaTable = yield select(getTableName)
    }

    if (filters) {
      let participants
      if (filters.owner) {
        participants = yield select(getParticipants)
      }
      let query = ''
      Object.keys(filters).forEach(el => {
        if (el === 'owner') {
          const queryString = getOwnerFilter(filters[el], participants)
          query += `${el}=${filters[el].option ? 'in=' : 'out='}(${encodeValue(queryString)});`
        } else {
          const encodedValue = encodeValue(filters[el].value)
          query += `${el}=${filters[el].option ? 'like=' : 'unlike='}|${encodedValue}|;`
        }
      })
      requestData.query = query
    }

    const {
      data: { count, data }
    } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, requestData, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })
    const language = localStorage.getItem('localLocale') || 'en'
    const modifiedData =
      data &&
      data.map(({ title, ...rest }) => ({
        ...rest,
        title: title && title.includes('{') && title.includes('}') ? JSON.parse(title)[language] : title
      }))
    yield put(actions.documentsGetDocumentsSuccess({ data: modifiedData, count }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.documentsGetDocumentsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_DOCUMENTS, getDocuments)
}
