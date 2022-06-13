import axios from 'axios'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { SERIALIZE_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'

const prepareValue = value => {
  let validInputsValue = {}
  Object.keys(value).forEach(el => {
    if (value[el] !== '') {
      if (el === 'serial_number' || el === 'count') {
        return (validInputsValue = { ...validInputsValue, [el]: Number(value[el]) })
      }
      return (validInputsValue = { ...validInputsValue, [el]: value[el] })
    }
    return null
  })
  return validInputsValue
}

export function* generateSSCCTasks() {
  try {
    const getValues = state => state.serializationSsccTasks
    const values = yield select(getValues)
    const validValues = prepareValue(values)

    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.post, `${SERIALIZE_API}/packaging/tasks`, validValues, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.serializationGetSSCCOptionsSuccess(data && data.id))
    yield put(push('/admin/track-and-trace/serialization-tasks'))

    toast.success('Successful creation of SSCC tasks')
  } catch (error) {
    yield put(actions.serializationGetSSCCOptionsFail(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.POST_SERIALIZATION_SSCC_OPTIONS, generateSSCCTasks)
}
