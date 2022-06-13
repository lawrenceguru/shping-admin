import axios from 'axios'
import { call, select, takeEvery, put, all } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { GPC_API } from 'constants/url'
// import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as actions from './actions'
import { schemaSelector, attributeValuesSelector } from './selectors'

function* getGpcSegment() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const currentLocale = localStorage.getItem('lang') || 'en'

    const {
      data: { schema }
    } = yield call(axios.get, `${GPC_API}/schema`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    if (!schema) {
      return
    }

    const {
      data: { segments }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/segments`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGpsSegmentsSuccess({ segments, schema }))
  } catch (error) {
    yield put(actions.getGpsSegmentsFail(error))
  }
}

function* getGpcFamily(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const schema = yield select(schemaSelector)
    const currentLocale = localStorage.getItem('lang') || 'en'

    const selectedSegment = payload.payload

    const {
      data: { families }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/segment/${selectedSegment}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGpsFamiliesSuccess({ families, schema }))
  } catch (error) {
    yield put(actions.getGpsFamiliesFail(error))
  }
}

function* getGpcClass(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const schema = yield select(schemaSelector)
    const currentLocale = localStorage.getItem('lang') || 'en'

    const selectedFamily = payload.payload

    const {
      data: { classes }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/family/${selectedFamily}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGpsClassesSuccess({ classes, schema }))
  } catch (error) {
    yield put(actions.getGpsClassesFail(error))
  }
}

function* getGpcBrick(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const schema = yield select(schemaSelector)
    const currentLocale = localStorage.getItem('lang') || 'en'

    const selectedClass = payload.payload

    const {
      data: { bricks }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/class/${selectedClass}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGpsBricksSuccess({ bricks, schema }))
  } catch (error) {
    yield put(actions.getGpsBricksFail(error))
  }
}

function* getGpcAttributesKey(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const schema = yield select(schemaSelector)
    const currentLocale = localStorage.getItem('lang') || 'en'

    const selectedBrick = payload.payload

    const {
      data: { attributes }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/brick/${selectedBrick}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGpsAttrKeysSuccess({ attributes }))
  } catch (error) {
    yield put(actions.getGpsAttrKeysFail(error))
  }
}

function* load(value, brick) {
  const ticket = yield select(fromIdentity.getTicket)
  const schema = yield select(schemaSelector)
  const currentLocale = localStorage.getItem('lang') || 'en'
  return yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/brick/${brick}/attribute/${value}`, {
    headers: { authenticateit_identity_ticket: ticket }
  })
}

function* getGpcAttributesValues(payload) {
  try {
    const { values, brick } = payload.payload
    const res = yield all(Object.keys(values).map(value => load(value, brick)))
    const newAttributes = {}
    res.forEach(el => {
      newAttributes[el.data.code] = el.data.values
    })

    yield put(actions.getGpsAttrValuesSuccess({ values: newAttributes }))
  } catch (error) {
    yield put(actions.getGpsAttrValuesFail(error))
  }
}

// eslint-disable-next-line consistent-return
export function* getGpcAttributeValues(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const schema = yield select(schemaSelector)
    const currentValues = yield select(attributeValuesSelector)
    if (Object.keys(currentValues).length === 1 && currentValues[''] === '') {
      delete currentValues['']
    }
    const currentLocale = localStorage.getItem('lang') || 'en'
    const { value, brick } = payload.payload
    if (!brick) {
      yield put(actions.getGpsAttrValuesFail())
    }
    const {
      data: { values }
    } = yield call(axios.get, `${GPC_API}/${schema}/${currentLocale}/brick/${brick}/attribute/${value}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    yield put(actions.getGpsAttrValuesSuccess({ values: { ...currentValues, [value]: values } }))
  } catch (error) {
    yield put(actions.getGpsAttrValuesFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_GPC_SEGMENTS, getGpcSegment)
  yield takeEvery(actions.GET_GPC_FAMILIES, getGpcFamily)
  yield takeEvery(actions.GET_GPC_CLASSES, getGpcClass)
  yield takeEvery(actions.GET_GPC_BRICKS, getGpcBrick)
  yield takeEvery(actions.GET_GPC_ATTR_KEYS, getGpcAttributesKey)
  yield takeEvery(actions.GET_GPC_ATTR_VALUES, getGpcAttributeValues)
  yield takeEvery(actions.GET_GPC_ATTRS_VALUES, getGpcAttributesValues)
}
