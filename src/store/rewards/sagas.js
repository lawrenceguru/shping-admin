import axios from 'axios'
import { select, takeEvery, put, call, delay, takeLatest } from 'redux-saga/effects'
import { REWARDS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import * as actions from './actions'
import { toReadableNumber } from '../../utils/helpers/mathOperations'

export function* getCampaigns({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(
      axios.post,
      ` ${REWARDS_API}/rewards_campaigns/get`,
      { ...payload },
      {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      }
    )

    yield put(actions.rewardsGetCampaignsSuccess(data))
  } catch (error) {
    yield put(actions.rewardsGetCampaignsFails(error))
  }
}

export function* getAdjustmentBudgetRate({ payload }) {
  const ticket = yield select(fromIdentity.getTicket)
  yield delay(300)
  try {
    // eslint-disable-next-line camelcase
    const { result, coins_step } = payload

    const adjustment = {
      adjustment: {
        event: parseFloat(result),
        coins_step
      }
    }

    const { data } = yield call(() =>
      axios.post(`${REWARDS_API}/adjustment/get`, adjustment, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )

    yield put(actions.rewardsGetAdjustmentBudgetRateSuccess(toReadableNumber(data.event, 3)))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsGetAdjustmentBudgetRateFail(error))
  }
}

export function* deleteCampaign({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${REWARDS_API}/rewards_campaigns/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsGetCampaigns())
    yield put(actions.rewardsDeleteCampaignSuccess())
    toast.success(intl.get('campaigns.rewards.deleteRewardSuccess'))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.rewardsGetCampaignsFails(error))
  }
}

export function* putStatusOfCampaign({ payload: { id, status } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${REWARDS_API}/rewards_campaigns/status/${id}`,
      { status },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.rewardsGetCampaigns())
    yield put(actions.rewardsPutStatusOfCampaignSuccess())
    toast.success(
      status === 'active'
        ? intl.get('campaigns.rewards.pendingRewardSuccess')
        : intl.get('campaigns.rewards.deactivateRewardSuccess')
    )
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.rewardsPutStatusOfCampaignFail(error))
  }
}

export function* postCampaign({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { name } = payload

    yield call(axios.post, `${REWARDS_API}/rewards_campaigns`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsPostCampaignSuccess())
    yield put(actions.rewardsGetCampaigns())
    toast.success(intl.get('campaigns.rewards.postCreateRewardSuccess', { name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.rewardsPostCampaignFail(error))
  }
}

export function* putCampaign({ payload: { id, request } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { name } = request

    yield call(axios.put, `${REWARDS_API}/rewards_campaigns/${id}`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsPutCampaignSuccess())
    yield put(actions.rewardsGetCampaigns())
    toast.success(intl.get('campaigns.rewards.putRewardSuccess', { name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsPutCampaignFail())
  }
}

export function* getCampaignBots() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${REWARDS_API}/bots`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsGetCampaignBotsSuccess(data))
  } catch (error) {
    yield put(actions.rewardsGetCampaignBotsFail(error))
  }
}

export function* deleteCampaignBot({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${REWARDS_API}/bots/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsGetCampaignBots())
    yield put(actions.rewardsDeleteCampaignBotSuccess())
    toast.success(intl.get('campaigns.bot.deleteBotSuccess'))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsDeleteCampaignBotFail(error))
  }
}

export function* createCampaignBot({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${REWARDS_API}/bots`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsCreateCampaignBotSuccess())
    yield put(actions.rewardsGetCampaignBots())
    toast.success(intl.get('campaigns.bot.postCreateBotSuccess', { name: payload.name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsCreateCampaignBotFail(error))
  }
}

export function* updateCampaignBot({ payload: { id, request } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${REWARDS_API}/bots/${id}`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsUpdateCampaignBotSuccess())
    toast.success(intl.get('campaigns.bot.putBotSuccess', { name: request.name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsUpdateCampaignBotFail())
  }
}

export function* getCampaignShoutouts({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.post, `${REWARDS_API}/shoutouts_campaigns/get`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsGetCampaignShoutoutsSuccess(data))
  } catch (error) {
    yield put(actions.rewardsGetCampaignShoutoutsFail(error))
  }
}

export function* deleteCampaignShoutout({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${REWARDS_API}/shoutouts_campaigns/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsDeleteCampaignShoutoutsSuccess())
    yield put(actions.rewardsGetCampaignShoutouts())
    toast.success(intl.get('campaigns.shoutouts.deleteShoutoutSuccess'))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsDeleteCampaignShoutoutsFail(error))
  }
}

export function* createCampaignShoutout({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${REWARDS_API}/shoutouts_campaigns`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsCreateCampaignShoutoutsSuccess())
    toast.success(intl.get('campaigns.shoutouts.createShoutoutSuccess', { name: payload.name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsCreateCampaignShoutoutsFail(error))
  }
}

export function* updateCampaignShoutout({ payload: { request, id } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${REWARDS_API}/shoutouts_campaigns/${id}`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsUpdateCampaignShoutoutsSuccess())
    toast.success(intl.get('campaigns.shoutouts.updateShoutoutSuccess', { name: request.name }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsUpdateCampaignShoutoutsFail(error))
  }
}

export function* getCampaignBoosts() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${REWARDS_API}/boost_campaigns/get`,
      {},
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.rewardsGetCampaignBoostsSuccess(data))
  } catch (error) {
    yield put(actions.rewardsGetCampaignBoostsFail(error))
  }
}

export function* campaignBoostStatusToggle({ payload: { id, status, name } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const boostList = yield select(state => state.rewards.boosts || [])
    const boostItem = boostList.find(item => item.id === id)

    const param = {
      ...boostItem,
      status
    }

    yield call(axios.put, `${REWARDS_API}/boost_campaigns/${id}`, param, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsCampaignBoostStatusToggleSuccess())
    toast.success(
      intl.get('campaigns.boost.putCampaignBoostSuccessWithStatus', {
        name,
        status: status === 'active' ? 'activated' : 'deactivated'
      })
    )
    yield put(actions.rewardsGetCampaignBoosts())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsCampaignBoostStatusToggleFail(error))
  }
}

export function* postCampaignBoost({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${REWARDS_API}/boost_campaigns`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.rewardsPostCampaignBoostSuccess())
    toast.success(intl.get('campaigns.boost.postCampaignBoostSuccess', { name: payload.name }))
    yield put(actions.rewardsGetCampaignBoosts())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsPostCampaignBoostFail(error))
  }
}

export function* putCampaignBoost({ payload: { id, request } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${REWARDS_API}/boost_campaigns/${id}`,
      { ...request },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.rewardsPutCampaignBoostSuccess())
    toast.success(intl.get('campaigns.boost.putCampaignBoostSuccess', { name: request.name }))
    yield put(actions.rewardsGetCampaignBoosts())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsPutCampaignBoostFail(error))
  }
}

export function* getCampaignReminders() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${REWARDS_API}/reminder_campaigns/get`,
      {},
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.rewardsGetCampaignRemindersSuccess(data))
  } catch (error) {
    yield put(actions.rewardsGetCampaignRemindersFail(error))
  }
}

export function* campaignReminderStatusToggle({ payload: { id, status, name } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const reminderList = yield select(state => state.rewards.reminders || [])
    const reminderItem = reminderList.find(item => item.id === id)

    const param = {
      ...reminderItem,
      status
    }

    yield call(axios.put, `${REWARDS_API}/reminder_campaigns/${id}`, param, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(
      intl.get('campaigns.reminder.putCampaignReminderSuccessWithStatus', {
        name,
        status: status === 'active' ? 'deactivated' : 'activated'
      })
    )

    yield put(actions.rewardsGetCampaignReminders())
    yield put(actions.rewardsCampaignReminderStatusToggleSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsCampaignReminderStatusToggleFail(error))
  }
}

export function* postCampaignReminder({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${REWARDS_API}/reminder_campaigns`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('campaigns.reminder.postCampaignReminderSuccess', { name: payload.name }))
    yield put(actions.rewardsPostCampaignReminderSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsPostCampaignReminderFail(error))
  }
}

export function* putCampaignReminder({ payload: { request, id } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${REWARDS_API}/reminder_campaigns/${id}`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('campaigns.reminder.putCampaignReminderSuccess', { name: request.name }))
    yield put(actions.rewardsPutCampaignReminderSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.rewardsPutCampaignReminderFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_CAMPAIGNS, getCampaigns)
  yield takeEvery(actions.DELETE_CAMPAIGN, deleteCampaign)
  yield takeEvery(actions.PUT_STATUS_OF_CAMPAIGN, putStatusOfCampaign)
  yield takeEvery(actions.POST_CAMPAIGN, postCampaign)
  yield takeEvery(actions.PUT_CAMPAIGN, putCampaign)
  yield takeEvery(actions.GET_CAMPAIGN_BOTS, getCampaignBots)
  yield takeEvery(actions.DELETE_CAMPAIGN_BOT, deleteCampaignBot)
  yield takeEvery(actions.CREATE_CAMPAIGN_BOT, createCampaignBot)
  yield takeEvery(actions.UPDATE_CAMPAIGN_BOT, updateCampaignBot)
  yield takeEvery(actions.GET_CAMPAIGN_SHOUTOUTS, getCampaignShoutouts)
  yield takeEvery(actions.DELETE_CAMPAIGN_SHOUTOUTS, deleteCampaignShoutout)
  yield takeEvery(actions.CREATE_CAMPAIGN_SHOUTOUT, createCampaignShoutout)
  yield takeEvery(actions.UPDATE_CAMPAIGN_SHOUTOUT, updateCampaignShoutout)
  yield takeEvery(actions.GET_CAMPAIGN_BOOSTS, getCampaignBoosts)
  yield takeEvery(actions.CAMPAIGN_BOOST_STATUS_TOGGLE, campaignBoostStatusToggle)
  yield takeEvery(actions.POST_CAMPAIGN_BOOST, postCampaignBoost)
  yield takeEvery(actions.PUT_CAMPAIGN_BOOST, putCampaignBoost)
  yield takeEvery(actions.GET_CAMPAIGN_REMINDER, getCampaignReminders)
  yield takeEvery(actions.CAMPAIGN_REMINDER_STATUS_TOGGLE, campaignReminderStatusToggle)
  yield takeEvery(actions.POST_CAMPAIGN_REMINDER, postCampaignReminder)
  yield takeEvery(actions.PUT_CAMPAIGN_REMINDER, putCampaignReminder)
  yield takeLatest(actions.GET_ADJUSTMENT_BUDGET_RATE, getAdjustmentBudgetRate)
}
