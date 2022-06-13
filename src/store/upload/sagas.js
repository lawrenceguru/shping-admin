/* eslint-disable indent */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { takeEvery, put, call } from 'redux-saga/effects'
import { UPLOAD_API } from 'constants/url'
import * as actions from './actions'

export function* upload(payload) {
  try {
    // const ticket = yield select(fromIdentity.getTicket)
    const data = new FormData()
    const { index, id, isVideo, type } = payload.payload

    data.append('inputfile', payload.payload.file)
    const response = yield call(axios.post, `${UPLOAD_API}/upload`, data, {
      headers: {
        'Content-Type': false
      }
    })
    yield put(actions.postUploadSuccess({ data: response.data.ok, index, id, isVideo, type }))
  } catch (error) {
    yield put(actions.postUploadFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.POST_UPLOAD, upload)
}
