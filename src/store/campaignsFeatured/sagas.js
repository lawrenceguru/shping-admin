import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import intl from 'react-intl-universal'
import { REWARDS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import { toast } from 'react-toastify'
import * as actions from './actions'
import { getTimezoneOffset } from '../../utils/helpers/date'

export function* getFeaturedList() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${REWARDS_API}/featured_products_campaigns/get`,
      {},
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.campaignsFeaturedGetFeaturedListSuccess(data))
  } catch (error) {
    yield put(actions.campaignsFeaturedGetFeaturedListFail(error))
  }
}

export function* getFeaturedChart({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const participantId = yield select(fromIdentity.getCurrentParticipant)
    const params = {
      date_from: payload.fromDate,
      date_to: payload.toDate,
      offset: getTimezoneOffset() * 60 || 0,
      owner: participantId
    }

    const { data } = yield call(
      axios.post,
      `${REWARDS_API}/featured_products_campaigns/analytic`,
      { ...params },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.campaignsFeaturedGetFeaturedChartSuccess(data))
  } catch (error) {
    yield put(actions.campaignsFeaturedGetFeaturedChartFail(error))
  }
}

export function* featuredStatusToggle({ payload: { id, status, name } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${REWARDS_API}/featured_products_campaigns/status/${id}/${status}`,
      {},
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.campaignsFeaturedGetFeaturedList())
    yield put(actions.campaignsFeaturedStatusToggleSuccess())
    toast.success(
      intl.get('campaigns.featured.putCampaignFeaturedSuccessWithStatus', {
        name,
        status: intl.get(`campaigns.featured.${status === 'inactive' ? 'deactivated' : 'activated'}`)
      })
    )
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.campaignsFeaturedStatusToggleFail(error))
  }
}

export function* postCampaignFeaturedProdcuts({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${REWARDS_API}/featured_products_campaigns`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('campaigns.featured.postCampaignFeaturedSuccess', { name: payload.name }))
    yield put(actions.campaignsFeaturedPostCampaignFeaturedSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.campaignsFeaturedPostCampaignFeaturedFail(error))
  }
}

export function* putCampaignFeaturedProdcuts({ payload }) {
  try {
    const { id, request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${REWARDS_API}/featured_products_campaigns/${id}`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('campaigns.featured.putCampaignFeaturedSuccess', { name: payload.name }))
    yield put(actions.campaignsFeaturedPutCampaignFeaturedSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.campaignsFeaturedPutCampaignFeaturedFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_FEATURED_LIST, getFeaturedList)
  yield takeEvery(actions.GET_FEATURED_CHART, getFeaturedChart)
  yield takeEvery(actions.FEATURED_STATUS_TOGGLE, featuredStatusToggle)
  yield takeEvery(actions.POST_CAMPAIGN_FEATURED, postCampaignFeaturedProdcuts)
  yield takeEvery(actions.PUT_CAMPAIGN_FEATURED, putCampaignFeaturedProdcuts)
}
