import { call, put, select, takeEvery } from 'redux-saga/effects'
import { DESCRIPTION_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import * as actions from './actions'

function* getImportStatuses() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${DESCRIPTION_API}/import/tasks`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.productsGetImportStatusesSuccess(data))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.productsGetImportStatusesFail(error))
  }
}

function* getImportStatus({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${DESCRIPTION_API}/import/tasks?id=${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.productsGetImportStatusSuccess(data))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.productsGetImportStatusFail(error))
  }
}

function* postStartImportTask({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data: oldData } = yield call(
      axios.post,
      `${DESCRIPTION_API}/import/tasks`,
      { ...payload },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    const { data } = yield call(axios.get, `${DESCRIPTION_API}/import/tasks?id=${oldData.id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const badLines = data.bad_lines && data.bad_lines.length
    const badGtins = data.bad_gtins && data.bad_gtins.length
    const badPrefixes = data.bad_prefixes && data.bad_prefixes.length

    if (!badLines && !badGtins && !badPrefixes) {
      toast.success(intl.get('importProducts.successMessage'))
    }

    yield put(actions.productsPostImportStartSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error_id) {
      toast.error(intl.get(`serverErrors.${error.response.data.error_id}`))
    } else if (error.response && error.response.data && error.response.data.error) {
      const errorMessage =
        error.response.data.error_data && error.response.data.error_data.length
          ? `${error.response.data.error.replace('.', '')}: ${error.response.data.error_data[0]}.`
          : error.response.data.error
      toast.error(errorMessage)
    }
    yield put(actions.productsPostImportStartFail(error))
  }
}

function* postRequestPreview({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(
      axios.post,
      `${DESCRIPTION_API}/import/preview`,
      { ...payload },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    const newPreview = []
    if (data.header && data.header.length) {
      data.header.forEach(header => {
        newPreview.push({ header, id: uuid() })
      })
    }

    yield put(actions.productsPostPreviewSuccess({ ...data, header: newPreview }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.productsPostPreviewFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_IMPORT_STATUSES, getImportStatuses)
  yield takeEvery(actions.GET_IMPORT_STATUS, getImportStatus)
  yield takeEvery(actions.POST_IMPORT_START, postStartImportTask)
  yield takeEvery(actions.POST_PREVIEW, postRequestPreview)
}
