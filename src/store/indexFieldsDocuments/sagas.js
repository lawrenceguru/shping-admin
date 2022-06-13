/* eslint-disable indent */
import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { INDEX_API } from 'constants/url'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as actions from './actions'

const flattenFields = ({ fields, filterDefaultFields }) => {
  const fieldIds = Object.keys(fields)

  return (
    (filterDefaultFields &&
      fieldIds.filter(fieldName => !(fieldName === 'image' || fieldName === 'id' || fieldName === 'name'))) ||
    fieldIds
  ).reduce((acc, fieldId) => {
    const fieldName = Object.keys(fields[fieldId])[0]
    const columnName = fields[fieldId][fieldName]

    acc.push({ fieldId, fieldName, columnName })

    return acc
  }, [])
}

export function* getIndexInfo() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${INDEX_API}/index-schema`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    if (data) {
      // eslint-disable-next-line camelcase
      const { table, fields, default_fields } = data.find(index_schema => index_schema.type === 'gdti')
      const processedDefaultFields = flattenFields({ fields: default_fields, filterDefaultFields: true })
      const processedCustomFields = flattenFields({ fields, filterDefaultFields: true })
      yield put(
        actions.indexFieldsDocumentsGetIndexInfoSuccess({
          tableName: table,
          defaultIndexFields: processedDefaultFields,
          customIndexFields: processedCustomFields
        })
      )
    }
  } catch (error) {
    yield put(actions.indexFieldsDocumentsGetIndexInfoFail(error))
  }
}

export function* postIndexInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(
      axios.post,
      `${INDEX_API}/index-schema`,
      {
        source_types: ['gs1', 'brand', 'expert', 'retailer', 'contributor'],
        type: 'gdti',
        fields: { ...payload.payload }
      },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )
    if (data) {
      // eslint-disable-next-line camelcase
      const { table, fields } = data
      const notify = () => toast.success('Data is successfully updated')
      yield put(
        actions.indexFieldsDocumentsPostIndexInfoSuccess({
          tableName: table,
          indexFields: fields
        })
      )
      getIndexInfo()
      notify()
    }
  } catch (error) {
    yield put(actions.indexFieldsDocumentsPostIndexInfoFail(error))
    const notify = () => toast.error('Save data error!')
    notify()
  }
}

export default function*() {
  yield takeEvery(actions.GET_INDEX_INFO, getIndexInfo)
  yield takeEvery(actions.POST_INDEX_INFO, postIndexInfo)
}
