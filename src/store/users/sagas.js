/* eslint-disable camelcase */
import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import intl from 'react-intl-universal'
import { IDENTITY_API } from 'constants/url'
import { toast } from 'react-toastify'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'
import { isValidString } from '../../utils/validation'
import { toReadableNumber } from '../../utils/helpers/mathOperations'
import { getProcessedBanHistory, getProccessedScans, getProccessedTransactions } from '../../utils/users'

export function* getUsersList({ payload }) {
  try {
    const { options, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)
    let newRequest = {
      ...request
    }

    if (request.id) {
      newRequest = {
        id: request.id
      }
    }

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/users/get`,
      {
        ...newRequest,
        ...options
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    const dataItem = data.data
    const dataItemNew = []
    let currentIndex = 0

    if (dataItem && dataItem.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let dataIndex = 0; dataIndex < dataItem.length; dataIndex++) {
        const item = dataItem[dataIndex]

        const {
          id,
          account_balance,
          total_balance,
          total_cashout_value_shping,
          total_erc20_value_shping,
          total_uncollected_coins,
          linked_google_flag,
          linked_wechat_flag,
          linked_vk_flag,
          linked_fb_flag,
          linked_email_flag,
          linked_phone_flag,
          linked_instagram_flag,
          linked_twitter_flag,
          total_timeline_scans,
          total_timeline_widget_video,
          system_rewarded_widget_video,
          brand_rewarded_widget_video
        } = item

        // eslint-disable-next-line no-continue
        if (id === 'REMOVE_ME') continue

        const { data: notificationData } = yield call(
          axios.post,
          `${IDENTITY_API}/user/notification_settings`,
          { id },
          {
            headers: { authenticateit_identity_ticket: ticket }
          }
        )

        const {
          brands,
          settings: { notify_on_buddies, notify_on_reviews, notify_on_rewards, remind_to_scan, reminders_notifications }
        } = notificationData

        dataItemNew[currentIndex] = {
          ...item,
          ...(isValidString(account_balance) && {
            account_balance: toReadableNumber(account_balance, 2)
          }),
          ...(isValidString(total_balance) && {
            total_balance: toReadableNumber(total_balance, 2)
          }),
          ...(isValidString(total_cashout_value_shping) && {
            total_cashout_value_shping: toReadableNumber(total_cashout_value_shping, 2)
          }),
          ...(isValidString(total_erc20_value_shping) && {
            total_erc20_value_shping: toReadableNumber(total_erc20_value_shping, 2)
          }),
          ...(isValidString(total_uncollected_coins) && {
            total_uncollected_coins: toReadableNumber(total_uncollected_coins, 2)
          }),
          linked_google: linked_google_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_wechat: linked_wechat_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_vk: linked_vk_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_fb: linked_fb_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_email: linked_email_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_phone: linked_phone_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_instagram: linked_instagram_flag === 1 ? intl.get('yes') : intl.get('no'),
          linked_twitter: linked_twitter_flag === 1 ? intl.get('yes') : intl.get('no'),
          ...(notificationData && {
            notify_on_buddies: notify_on_buddies ? intl.get('yes') : intl.get('no'),
            notify_on_reviews: notify_on_reviews ? intl.get('yes') : intl.get('no'),
            notify_on_rewards: notify_on_rewards ? intl.get('yes') : intl.get('no'),
            remind_to_scan: remind_to_scan ? intl.get('yes') : intl.get('no'),
            reminders_notifications: reminders_notifications ? intl.get('yes') : intl.get('no'),
            brands_shoutouts: brands
              .map(({ brand, allow_shoutouts }) => `${brand}: ${allow_shoutouts ? intl.get('yes') : intl.get('no')}`)
              .join(', ')
          }),
          total_timeline_product: total_timeline_scans,
          total_timeline_video: total_timeline_widget_video,
          system_rewarded_video: system_rewarded_widget_video,
          brand_rewarded_video: brand_rewarded_widget_video
        }
        currentIndex += 1
      }
    }
    const count = data.count > request.limit ? data.count - request.limit + dataItemNew.length : dataItemNew.length
    const recreatedData = { count, data: dataItemNew }

    yield put(actions.usersGetUsersListSuccess(recreatedData))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.usersGetUsersListFail(error))
  }
}

export function* getBlockStatus({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/user/permanently_block/get`,
      { id: payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetBlockedStatusSuccess(data.status))
  } catch (error) {
    yield put(actions.usersGetBlockedStatusFail(error))
  }
}

export function* getBanHistory({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/user/rewards_ban/get`,
      {
        id: payload
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetBanHistorySuccess(getProcessedBanHistory(data)))
  } catch (error) {
    yield put(actions.usersGetBanHistoryFail(error))
  }
}

export function* sendTimeline({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${IDENTITY_API}/user/timeline/message`,
      { id: payload.id, message: payload.message, type: payload.type },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success(intl.get('users.timeLineMessageSuccess'))
    yield put(actions.usersSendTimelineMessageSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.usersSendTimelineMessageFail())
  }
}

export function* setRewardsBanStatus({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${IDENTITY_API}/user/rewards_ban/${payload.reason ? 'set' : 'unset'}`,
      { ...payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )
    yield put(actions.usersSetRewardsBanSuccess())
    yield put(actions.usersGetBanHistory(payload.id))
  } catch (error) {
    yield put(actions.usersSetRewardsBanFail())
  }
}

export function* setBlockStatus({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${IDENTITY_API}/user/permanently_block/${payload.type}`,
      { id: payload.id },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersSetBlockStatusSuccess())
    yield put(actions.usersGetBlockedStatus(payload.id))
  } catch (error) {
    yield put(actions.usersSetBlockStatusFail())
  }
}

export function* getUserLevelInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/user/level`,
      { id: payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetUserLevelInfoSuccess(data))
  } catch (error) {
    yield put(actions.usersGetUserLevelInfoFail(error))
  }
}

export function* getContributionLevelInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/user/contributor_level`,
      { id: payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetContributorLevelInfoSuccess(data))
  } catch (error) {
    yield put(actions.usersGetContributorLevelInfoFail(error))
  }
}

export function* getRewardsList({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/user/rewards`,
      {
        ...payload,
        type: 'approved'
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetUserRewardsSuccess(data))
  } catch (error) {
    yield put(actions.usersGetUserRewardsFail(error))
  }
}

export function* getUserBuddiesList({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.post, `${IDENTITY_API}/user/buddies`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.usersGetUsersBuddiesSuccess(data))
  } catch (error) {
    put(actions.usersGetUsersBuddiesFail(error))
  }
}

export function* getUserFeed({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.post, `${IDENTITY_API}/user/timeline`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.usersGetUserFeedSuccess(data))
  } catch (error) {
    yield put(actions.usersGetUserFeedFail(error))
  }
}

export function* getScans({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.post, `${IDENTITY_API}/user/scans`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.usersGetUsersScansSuccess({ data: getProccessedScans(data.data), count: data.count }))
  } catch (error) {
    yield put(actions.usersGetUsersScansFail(error))
  }
}

function* getTransactionHistory({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const {
      data: { history }
    } = yield call(
      axios.post,
      `${IDENTITY_API}/user/transactions`,
      { id: payload },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.usersGetUserTransactionsSuccess(getProccessedTransactions(history)))
  } catch (error) {
    yield put(actions.usersGetUserTransactionsFail(getProccessedTransactions(error)))
  }
}

function* putTransactionHistory({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${IDENTITY_API}/user/transactions/cashouts/${payload.cashout_id}/failure`,
      { id: payload.id },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    yield put(actions.usersPutUserTransactionSuccess())
    yield put(actions.usersGetUserTransactions(payload.id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.usersPutUserTransactionFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_USERS_LIST, getUsersList)
  yield takeEvery(actions.GET_BLOCK_STATUS, getBlockStatus)
  yield takeEvery(actions.GET_BAN_HISTORY, getBanHistory)
  yield takeEvery(actions.SEND_TIMELINE_MESSAGE, sendTimeline)
  yield takeEvery(actions.SET_REWARDS_BAN, setRewardsBanStatus)
  yield takeEvery(actions.SET_BLOCK_STATUS, setBlockStatus)
  yield takeEvery(actions.GET_USER_LEVELS_INFO, getUserLevelInfo)
  yield takeEvery(actions.GET_USER_REWARDS, getRewardsList)
  yield takeEvery(actions.GET_USER_BUDDIES, getUserBuddiesList)
  yield takeEvery(actions.GET_USER_FEED, getUserFeed)
  yield takeEvery(actions.GET_CONTRIBUTOR_LEVEL_INFO, getContributionLevelInfo)
  yield takeEvery(actions.GET_USER_SCANS, getScans)
  yield takeEvery(actions.GET_USER_TRANSACTIONS, getTransactionHistory)
  yield takeEvery(actions.PUT_USER_TRANSACTION, putTransactionHistory)
}
