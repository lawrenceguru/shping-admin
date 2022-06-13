import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { toast } from 'react-toastify'
import { PARTICIPANT_API } from 'constants/url'
import axios from 'axios'
import * as actions from './actions'

export function* inviteUser({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(() =>
      axios.post(
        `${PARTICIPANT_API}/team`,
        { access_type: payload.access_type, id: payload.id.value },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
    )
    toast.success('Teammate was successfully invited.')

    yield put(actions.inviteUserSuccess)
  } catch (error) {
    yield put(actions.inviteUserFailed(error))
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
  }
}

export default function*() {
  yield takeEvery(actions.POST_INVITE_ACCOUNT, inviteUser)
}
