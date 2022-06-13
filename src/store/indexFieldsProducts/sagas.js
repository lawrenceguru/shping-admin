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
      const { table, fields, source_types, default_fields } = data.find(index_schema => index_schema.type === 'gtin')
      let tableGdtiName = ''
      // eslint-disable-next-line camelcase
      const gdti = data.find(index_schema => index_schema.type === 'gdti')

      if (gdti) {
        tableGdtiName = gdti.table
      }

      const processedDefaultFields = flattenFields({ fields: default_fields, filterDefaultFields: true })
      const processedCustomFields = flattenFields({ fields, filterDefaultFields: true })
      localStorage.setItem('indexTableName', table)
      localStorage.setItem('indexTableGdtiName', tableGdtiName)
      localStorage.setItem('indexFields', JSON.stringify(processedCustomFields))
      localStorage.setItem('sourceTypes', JSON.stringify(source_types))
      yield put(
        actions.indexFieldsProductsGetIndexInfoSuccess({
          tableName: table,
          defaultIndexFields: processedDefaultFields,
          customIndexFields: processedCustomFields,
          tableGdtiName
        })
      )
    }
  } catch (error) {
    yield put(actions.indexFieldsProductsGetIndexInfoFail(error))
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
        type: 'gtin',
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
        actions.indexFieldsProductsPostIndexInfoSuccess({
          tableName: table,
          indexFields: fields
        })
      )
      getIndexInfo()
      notify()
    }
  } catch (error) {
    yield put(actions.indexFieldsProductsPostIndexInfoFail(error))
    const notify = () => toast.error('Save data error!')
    notify()
  }
}

export function* getParticipantBrands() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(
      axios.post,
      `${INDEX_API}/rapi`,
      {
        table: 'brand'
      },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )

    if (data) {
      yield put(
        actions.indexFieldsProductsGetBrandsSuccess({
          brands: data
        })
      )
    }
  } catch (error) {
    yield put(actions.indexFieldsProductsGetBrandsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_INDEX_INFO, getIndexInfo)
  yield takeEvery(actions.POST_INDEX_INFO, postIndexInfo)
  yield takeEvery(actions.GET_BRANDS, getParticipantBrands)
}
