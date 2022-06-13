// https://github.com/diegohaz/arc/wiki/Sagas
import { all, delay, fork, put, select } from 'redux-saga/effects'

import { identityGetSession, identityGetSessionFail } from 'store/actions'

const req = require.context('.', true, /\.\/.+\/sagas\.js$/)

const sagas = req.keys().map(key => req(key).default)

export const getUrlPath = state => state.router.location.pathname

function* checkSession() {
  while (true) {
    const path = yield select(getUrlPath)
    const session = localStorage.getItem('session')
    if (!session && path.includes('admin')) {
      yield put(identityGetSessionFail('Session is expired.'))
    } else if (session && path.includes('admin')) {
      yield put(identityGetSession(JSON.parse(session)))
    }
    yield delay(60 * 60 * 1000)
  }
}

export default function*(services = {}) {
  yield fork(checkSession)
  yield all(sagas.map(saga => fork(saga, services)))
}
