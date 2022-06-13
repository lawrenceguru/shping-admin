import { call, put, select, takeEvery } from 'redux-saga/effects'
import { PARTICIPANT_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* postCreateOrUpdateParticipant({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { inputsValue, id } = payload

    if (!id) {
      yield call(() =>
        axios.post(`${PARTICIPANT_API}/supply_chain/participants`, inputsValue, {
          headers: { authenticateit_identity_ticket: ticket }
        })
      )
      toast.success(`Participant ${inputsValue.name} successfully created`)
    } else {
      yield call(() =>
        axios.put(`${PARTICIPANT_API}/supply_chain/participants/${id}`, inputsValue, {
          headers: { authenticateit_identity_ticket: ticket }
        })
      )
      toast.success(`Participant ${inputsValue.name} successfully updated`)
    }
    yield put(actions.createOrUpdateParticipantSuccess())
    payload.callback()
  } catch (error) {
    yield put(actions.createOrUpdateParticipantFail(error))
  }
}

export function* deleteParticipant({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${PARTICIPANT_API}/supply_chain/participants/${payload.id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    yield put(actions.deleteParticipantSuccess())
    toast.success(`Participant ${payload.name} successfully deleted`)
    yield put(actions.participantGetSupplyParticipants({ skip: 0, take: 10 }))
  } catch (error) {
    yield put(actions.deleteParticipantFail(error))
  }
}

export function* getSupplyParticipants(payload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { filters } = payload.payload
    const parameters = filters
      ? Object.keys(filters)
          .map(key => {
            const filterKey = filters[key]
            let response = ``
            if (key === 'phone') {
              response = `${key}=${encodeURIComponent(filterKey.value)}`
            } else {
              response = `${key}=${filterKey.value}`
            }

            return filterKey ? response : ''
          })
          .filter(params => params)
      : ''
    const params = parameters ? `${parameters.join('&')}` : ''
    const filter = {
      limit: payload.payload.take,
      offset: payload.payload.skip,
      sort_by: payload.payload.order || 'id',
      sort_order: payload.payload.sort_order || 'asc'
    }

    const response = yield call(
      axios.get,
      // eslint-disable-next-line max-len
      `${PARTICIPANT_API}/supply_chain/participants?${params}&limit=${filter.limit}&offset=${filter.offset}&sort_by=${filter.sort_by}&sort_order=${filter.sort_order}`,
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )

    yield put(actions.participantGetSupplyParticipantsSuccess(response.data))
  } catch (error) {
    yield put(actions.participantGetSupplyParticipantsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.POST_SUPPLY_PARTICIPANTS, postCreateOrUpdateParticipant)
  yield takeEvery(actions.DELETE_SUPPLY_PARTICIPANT, deleteParticipant)
  yield takeEvery(actions.GET_SUPPLY_PARTICIPANTS, getSupplyParticipants)
}
