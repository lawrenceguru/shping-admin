import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { myTeamGetMyTeam } from 'store/actions'
import intl from 'react-intl-universal'
import { ANALYTICS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'

export function* getSummaryReports() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${ANALYTICS_API}/summary/task`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(myTeamGetMyTeam())
    yield put(actions.campaingsGetSummaryReportsSuccess(data))
  } catch (error) {
    yield put(actions.campaingsGetSummaryReportsSuccess(error))
  }
}

function* deleteSummaryReports({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${ANALYTICS_API}/summary/task/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.campaignsDeleteSummaryReportSuccess())
    toast.success(intl.get('campaigns.summaryReports.successDelete'))
    yield put(actions.campaingsGetSummaryReports())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.campaignsDeleteSummaryReportFail(error))
  }
}

function* getSummaryReportDetails({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${ANALYTICS_API}/summary/task/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.campaignsGetDetailsForSummaryReportsSuccess(data))
  } catch (error) {
    yield put(actions.campaignsGetDetailsForSummaryReportsFail(error))
  }
}

function* postSummaryReport({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${ANALYTICS_API}/summary/task`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.campaignsPostSummaryReportSuccess())
    toast.success(intl.get('campaigns.summaryReports.successMessage'))
    yield put(actions.campaingsGetSummaryReports())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.campaignsPostSummaryReportFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_SUMMARY_REPORTS, getSummaryReports)
  yield takeEvery(actions.DELETE_SUMMARY_REPORT, deleteSummaryReports)
  yield takeEvery(actions.GET_DETAILS_FOR_SUMMARY_REPORT, getSummaryReportDetails)
  yield takeEvery(actions.POST_SUMMARY_REPORT, postSummaryReport)
}
