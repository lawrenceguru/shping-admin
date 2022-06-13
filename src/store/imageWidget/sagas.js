import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { IMAGE_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import * as actions from './actions'

function* getImageObjects({ payload }) {
  try {
    const image = payload.url.split('/')
    const imageName = image[image.length - 1]
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${IMAGE_API}/objects/${imageName}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    if (data.objects) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of data.objects) {
        if (!item.title) item.title = item.name
      }
    }
    yield put(actions.imageObjectsSuccess(data))
  } catch (error) {
    yield put(actions.imageLabelsFailed(error))
  }
}

function* getImageLabels({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${IMAGE_API}/items`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    const response = data && data.map(({ id, name }) => ({ label: name, value: id }))
    yield put(actions.requestImageLabelsSuccess({ response }))

    yield call(getImageObjects, { payload })
  } catch (error) {
    yield put(actions.imageLabelsFailed(error))
  }
}

function* postImageLabels({ payload }) {
  try {
    const image = payload.path.url.split('/')
    const imageName = image[image.length - 1]
    const ticket = yield select(fromIdentity.getTicket)
    const notify = () => toast.success(intl.get('widgets.images.addLabel'))

    const { data } = yield call(
      axios.post,
      `${IMAGE_API}/objects/${imageName}`,
      { ...payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.saveImageLabelsSuccess(data))
    notify()

    yield call(getImageObjects, { payload: { url: data && data.id } })
  } catch (error) {
    yield put(actions.imageLabelsFailed(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_IMAGE_LABELS, getImageLabels)
  yield takeEvery(actions.POST_IMAGE_LABELS, postImageLabels)
}
