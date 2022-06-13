import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import axios from 'axios'
import { AUTH_API } from 'constants/url'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import moment from 'moment'
import * as actions from './actions'
import { formatDate, formatDateToUTC, formatUTCToApi, parseDate } from '../../utils/helpers/date'

export function* getLink({ payload: { offset, gtinCode, limit } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(() =>
      axios.get(`${AUTH_API}/capture_link`, {
        params: { code: gtinCode, offset, limit },
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const { count } = data
    const links =
      data &&
      // eslint-disable-next-line camelcase
      data.data.map(({ expiry_datetime, ...rest }) => ({
        ...rest,
        expiry_datetime: formatDate(formatDateToUTC(expiry_datetime), { outputFormat: 'dd MMM yyyy hh:mm:ss a' })
      }))

    yield put(actions.getCaptureLinkSuccess({ links, count }))
  } catch (error) {
    yield put(actions.getCaptureLinkFailed(error))
  }
}

function* postLink({ payload: { gtinCode, currDate } }) {
  try {
    const notify = () => toast.success(intl.get('widgets.expired.addMessage'))
    const formattedHour =
      // eslint-disable-next-line no-nested-ternary
      currDate.median === 'am'
        ? +currDate.hour === 12
          ? 0
          : +currDate.hour
        : +currDate.hour === 12
        ? 12
        : +currDate.hour + 12
    const date = currDate.date.utc()
    date.set('hour', formattedHour)
    date.set('minute', currDate.minute)
    date.set('second', 59)
    const dateString = `${date.format('YYYY-MM-DDTHH:mm:ss')}Z`
    const expirationDate = formatUTCToApi(parseDate(moment.utc(dateString).format()))

    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${AUTH_API}/capture_link`,
      { code: gtinCode, expiry_datetime: expirationDate },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    yield call(getLink, { payload: { offset: currDate.offset, gtinCode, limit: currDate.limit } })
    notify()
  } catch (error) {
    yield put(actions.postCaptureLinkFailed(error))
  }
}

function* deleteLink({ payload: { id, gtinCode, offset, limit } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${AUTH_API}/capture_link`,
      { ids: [id] },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    yield call(getLink, { payload: { offset, gtinCode, limit } })
  } catch (error) {
    yield put(actions.removeCodeLinkFailed(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_CAPTURE_LINK, getLink)
  yield takeEvery(actions.POST_CAPTURE_LINK, postLink)
  yield takeEvery(actions.DELETE_CAPTURE_LINK, deleteLink)
}
