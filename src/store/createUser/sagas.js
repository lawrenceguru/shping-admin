import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { fromIdentity } from 'store/selectors'
import { IDENTITY_API, PARTICIPANT_API } from 'constants/url'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* createUser({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const accountValue = {
      last_name: payload.last_name.value,
      password: payload.password.value,
      nickname: payload.nickname.value,
      first_name: payload.first_name.value
    }

    const response = yield call(() =>
      axios.post(
        `${IDENTITY_API}/account`,
        { ...accountValue, reg_type: 'nickname' },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
    )
    toast.success('Teammate was successfully created.')

    yield call(() =>
      axios.post(
        `${PARTICIPANT_API}/team`,
        { access_type: payload.access_type, id: response.data.id, context: payload.context || undefined },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
    )
    toast.success('Teammate was successfully invited.')

    yield put(actions.createUserSuccess)
  } catch (error) {
    yield put(actions.createUserFailed(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.POST_CREATE_ACCOUNT, createUser)
}
