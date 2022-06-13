import { call, put, select, takeEvery } from 'redux-saga/effects'
import { PARTICIPANT_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import * as actions from './actions'

export function* getSupplyParticipantsLocations() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(axios.get, `${PARTICIPANT_API}/supply_chain/business_locations`, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(actions.getParticipantLocationSuccess(response.data))
  } catch (error) {
    yield put(actions.getParticipantLocationFail(error))
  }
}

export function* deleteSupplyParticipantsLocations({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(axios.delete, `${PARTICIPANT_API}/business_locations/${payload.id}`, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })

    if (response.status === 204) {
      yield put(actions.deleteParticipantLocationSuccess())
      yield put(actions.getParticipantLocation())
      toast.success(intl.get('supplyChainLocations.onDeleteLocationSuccess', { name: payload.name }))
    }
  } catch (error) {
    yield put(actions.deleteParticipantLocationFail(error))
  }
}

export function* createSupplyParticipantsLocations({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(axios.post, `${PARTICIPANT_API}/business_locations`, payload, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })

    if (response.status === 201) {
      yield put(actions.createParticipantLocationSuccess())
      yield put(actions.getParticipantLocation())
      toast.success(intl.get('supplyChainLocations.onCreateLocationSuccess', { name: payload.name }))
    }
  } catch (error) {
    yield put(actions.createParticipantLocationFail(error))
  }
}

export function* updateSupplyParticipantsLocations({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const response = yield call(axios.put, `${PARTICIPANT_API}/business_locations/${payload.id}`, payload, {
      headers: {
        authenticateit_identity_ticket: ticket
      }
    })

    if (response.status === 200) {
      yield put(actions.updateParticipantLocationSuccess())
      yield put(actions.getParticipantLocation())
      toast.success(intl.get('supplyChainLocations.onUpdateLocationSuccess', { name: payload.name }))
    }
  } catch (error) {
    yield put(actions.updateParticipantLocationFail(error))
    if (error.response && error.response.data && error.response.data.error_id) {
      toast.error(intl.get(`serverErrors.${error.response.data.error_id}`))
    } else {
      toast.error(`Error at ${error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.GET_SUPPLY_PARTICIPANT_LOCATION, getSupplyParticipantsLocations)
  yield takeEvery(actions.DELETE_SUPPLY_PARTICIPANT_LOCATION, deleteSupplyParticipantsLocations)
  yield takeEvery(actions.CREATE_SUPPLY_PARTICIPANT_LOCATION, createSupplyParticipantsLocations)
  yield takeEvery(actions.UPDATE_SUPPLY_PARTICIPANT_LOCATION, updateSupplyParticipantsLocations)
}
