import { put, takeLatest } from 'redux-saga/effects'

import { identityPostSession } from 'store/actions'

import * as actions from './actions'

export function* loginForm({ payload }) {
  try {
    yield put(identityPostSession(payload))
  } catch (error) {
    yield put(actions.authLoginFormFail(error))
  }
}

export default function*() {
  yield takeLatest(actions.AUTH_LOGIN_FORM, loginForm)
}
