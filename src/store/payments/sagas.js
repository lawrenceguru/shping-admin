import axios from 'axios'
// import { push } from 'connected-react-router'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { PAYMENTS_API } from 'constants/url'

import { fromIdentity } from 'store/selectors'

// import getDefaultRedirectPage from 'utils/redirect'

import * as actions from './actions'

const getUrlHash = state => state.router.location.hash

export function* getParticipantPlan({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const hash = yield select(getUrlHash)
    const identity = yield select(fromIdentity.getIdentity)
    // eslint-disable-next-line no-unused-vars
    const isSystem =
      fromIdentity.participantSelector(identity) &&
      fromIdentity.participantSelector(identity).participant_type.includes('system')

    if (!ticket) {
      return
    }

    const response = yield call(axios.get, `${PAYMENTS_API}/participants/current/billing_plan`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.paymentsGetParticipantPlanSuccess(response.data))

    const locationURL = hash.split('?')

    if (locationURL[0].includes('#/')) {
      const page = locationURL[0].split('#/')[1]

      // TODO: implement later
      if (page === 'admin') {
        // eslint-disable-next-line consistent-return
        // return yield put(push(getDefaultRedirectPage(response.data.plan, identity, isSystem)))
      }
    }
    if (payload) {
      // yield put(push(getDefaultRedirectPage(response.data.plan, identity, isSystem)))
    }
  } catch (error) {
    yield put(actions.paymentsGetParticipantPlanFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.PAYMENTS_GET_PARTICIPANT_PLAN, getParticipantPlan)
}
