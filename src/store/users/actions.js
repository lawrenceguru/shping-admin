export const GET_USERS_LIST = 'users/GET_USERS_LIST'
export const GET_USERS_LIST_SUCCESS = 'users/GET_USERS_LIST_SUCCESS'
export const GET_USERS_LIST_FAIL = 'users/GET_USERS_LIST_FAIL'

export const GET_BLOCK_STATUS = 'users/GET_BLOCK_STATUS'
export const GET_BLOCK_STATUS_SUCCESS = 'users/GET_BLOCK_STATUS_SUCCESS'
export const GET_BLOCK_STATUS_FAIL = 'users/GET_BLOCK_STATUS_FAIL'

export const GET_BAN_HISTORY = 'users/GET_BAN_HISTORY'
export const GET_BAN_HISTORY_SUCCESS = 'users/GET_BAN_HISTORY_SUCCES'
export const GET_BAN_HISTORY_FAIL = 'users/GET_BAN_HISTORY_FAIL'

export const SEND_TIMELINE_MESSAGE = 'users/SEND_TIMELINE_MESSAGE'
export const SEND_TIMELINE_MESSAGE_SUCCESS = 'users/SEND_TIMELINE_MESSAGE_SUCCESS'
export const SEND_TIMELINE_MESSAGE_FAIL = 'users/SEND_TIMELINE_MESSAGE_FAIL'

export const SET_REWARDS_BAN = 'users/SET_REWARDS_BAN'
export const SET_REWARDS_BAN_SUCCESS = 'users/SET_REWARDS_BAN_SUCCESS'
export const SET_REWARDS_BAN_FAIL = 'users/SET_REWARDS_BAN_FAIL'

export const SET_BLOCK_STATUS = 'users/SET_BLOCK_STATUS'
export const SET_BLOCK_STATUS_SUCCESS = 'users/SET_BLOCK_STATUS_SUCCESS'
export const SET_BLOCK_STATUS_FAIL = 'users/SET_BLOCK_STATUS_FAIL'

export const GET_USER_LEVELS_INFO = 'users/GET_USER_LEVELS_INFO'
export const GET_USER_LEVELS_INFO_SUCCESS = 'users/GET_USER_LEVELS_INFO_SUCCESS'
export const GET_USER_LEVELS_INFO_FAIL = 'users/GET_USER_LEVELS_INFO_FAIL'

export const GET_CONTRIBUTOR_LEVEL_INFO = 'users/GET_CONTRIBUTOR_LEVEL_INFO'
export const GET_CONTRIBUTOR_LEVEL_INFO_SUCCESS = 'users/GET_CONTRIBUTOR_LEVEL_INFO_SUCCESS'
export const GET_CONTRIBUTOR_LEVEL_INFO_FAIL = 'users/GET_CONTRIBUTOR_LEVEL_INFO_FAIL'

export const GET_USER_REWARDS = 'users/GET_USER_REWARDS'
export const GET_USER_REWARDS_SUCCESS = 'users/GET_USER_REWARDS_SUCCESS'
export const GET_USER_REWARDS_FAIL = 'users/GET_USER_REWARDS_FAIL'

export const GET_USER_FEED = 'users/GET_USER_FEED'
export const GET_USER_FEED_SUCCESS = 'users/GET_USER_FEED_SUCCESS'
export const GET_USER_FEED_FAIL = 'users/GET_USER_FEED_FAIL'

export const GET_USER_BUDDIES = 'users/GET_USER_BUDDIES'
export const GET_USER_BUDDIES_SUCCESS = 'users/GET_USER_BUDDIES_SUCCESS'
export const GET_USER_BUDDIES_FAIL = 'users/GET_USER_BUDDIES_FAIL'

export const GET_USER_SCANS = 'users/GET_USER_SCANS'
export const GET_USER_SCANS_SUCCESS = 'users/GET_USER_SCANS_SUCCESS'
export const GET_USER_SCANS_FAIL = 'users/GET_USER_SCANS_FAIL'

export const GET_USER_TRANSACTIONS = 'users/GET_USER_TRANSACTIONS'
export const GET_USER_TRANSACTIONS_SUCCESS = 'users/GET_USER_TRANSACTIONS_SUCCESS'
export const GET_USER_TRANSACTIONS_FAIL = 'users/GET_USER_TRANSACTIONS_FAIL'

export const PUT_USER_TRANSACTION = 'users/PUT_USER_TRANSACTION'
export const PUT_USER_TRANSACTION_SUCCESS = 'users/PUT_USER_TRANSACTION_SUCCESS'
export const PUT_USER_TRANSACTION_FAIL = 'users/PUT_USER_TRANSACTION_FAIL'

export const CLEAR_USER_INFO = 'users/CLEAR_USER_INFO'

export const usersGetUsersList = payload => ({
  type: GET_USERS_LIST,
  payload
})

export const usersGetUsersListSuccess = payload => ({
  type: GET_USERS_LIST_SUCCESS,
  payload
})

export const usersGetUsersListFail = payload => ({
  type: GET_USERS_LIST_FAIL,
  payload
})

export const usersGetBlockedStatus = payload => ({
  type: GET_BLOCK_STATUS,
  payload
})

export const usersGetBlockedStatusSuccess = payload => ({
  type: GET_BLOCK_STATUS_SUCCESS,
  payload
})

export const usersGetBlockedStatusFail = payload => ({
  type: GET_BLOCK_STATUS_FAIL,
  payload
})

export const usersGetBanHistory = payload => ({
  type: GET_BAN_HISTORY,
  payload
})

export const usersGetBanHistorySuccess = payload => ({
  type: GET_BAN_HISTORY_SUCCESS,
  payload
})

export const usersGetBanHistoryFail = payload => ({
  type: GET_BAN_HISTORY_FAIL,
  payload
})

export const usersSendTimelineMessage = payload => ({
  type: SEND_TIMELINE_MESSAGE,
  payload
})

export const usersSendTimelineMessageSuccess = payload => ({
  type: SEND_TIMELINE_MESSAGE_SUCCESS,
  payload
})

export const usersSendTimelineMessageFail = payload => ({
  type: SEND_TIMELINE_MESSAGE_FAIL,
  payload
})

export const usersSetRewardsBan = payload => ({
  type: SET_REWARDS_BAN,
  payload
})

export const usersSetRewardsBanSuccess = payload => ({
  type: SET_REWARDS_BAN_SUCCESS,
  payload
})

export const usersSetRewardsBanFail = payload => ({
  type: SET_REWARDS_BAN_FAIL,
  payload
})

export const usersSetBlockStatus = payload => ({
  type: SET_BLOCK_STATUS,
  payload
})

export const usersSetBlockStatusSuccess = payload => ({
  type: SET_BLOCK_STATUS_SUCCESS,
  payload
})

export const usersSetBlockStatusFail = payload => ({
  type: SET_BLOCK_STATUS_FAIL,
  payload
})

export const usersGetUserLevelInfo = payload => ({
  type: GET_USER_LEVELS_INFO,
  payload
})

export const usersGetUserLevelInfoSuccess = payload => ({
  type: GET_USER_LEVELS_INFO_SUCCESS,
  payload
})

export const usersGetUserLevelInfoFail = payload => ({
  type: GET_USER_LEVELS_INFO_FAIL,
  payload
})

export const usersGetContributorLevelInfo = payload => ({
  type: GET_CONTRIBUTOR_LEVEL_INFO,
  payload
})

export const usersGetContributorLevelInfoSuccess = payload => ({
  type: GET_CONTRIBUTOR_LEVEL_INFO_SUCCESS,
  payload
})

export const usersGetContributorLevelInfoFail = payload => ({
  type: GET_CONTRIBUTOR_LEVEL_INFO_FAIL,
  payload
})

export const usersGetUserRewards = payload => ({
  type: GET_USER_REWARDS,
  payload
})

export const usersGetUserRewardsSuccess = payload => ({
  type: GET_USER_REWARDS_SUCCESS,
  payload
})

export const usersGetUserRewardsFail = payload => ({
  type: GET_USER_REWARDS_FAIL,
  payload
})

export const usersGetUserFeed = payload => ({
  type: GET_USER_FEED,
  payload
})

export const usersGetUserFeedSuccess = payload => ({
  type: GET_USER_FEED_SUCCESS,
  payload
})

export const usersGetUserFeedFail = payload => ({
  type: GET_USER_FEED_FAIL,
  payload
})

export const usersGetUsersBuddies = payload => ({
  type: GET_USER_BUDDIES,
  payload
})

export const usersGetUsersBuddiesSuccess = payload => ({
  type: GET_USER_BUDDIES_SUCCESS,
  payload
})

export const usersGetUsersBuddiesFail = payload => ({
  type: GET_USER_BUDDIES_FAIL,
  payload
})

export const usersClearUserInfo = payload => ({
  type: CLEAR_USER_INFO,
  payload
})

export const usersGetUsersScans = payload => ({
  type: GET_USER_SCANS,
  payload
})

export const usersGetUsersScansSuccess = payload => ({
  type: GET_USER_SCANS_SUCCESS,
  payload
})

export const usersGetUsersScansFail = payload => ({
  type: GET_USER_SCANS_FAIL,
  payload
})

export const usersGetUserTransactions = payload => ({
  type: GET_USER_TRANSACTIONS,
  payload
})

export const usersGetUserTransactionsSuccess = payload => ({
  type: GET_USER_TRANSACTIONS_SUCCESS,
  payload
})

export const usersGetUserTransactionsFail = payload => ({
  type: GET_USER_TRANSACTIONS_FAIL,
  payload
})

export const usersPutUserTransaction = payload => ({
  type: PUT_USER_TRANSACTION,
  payload
})

export const usersPutUserTransactionSuccess = payload => ({
  type: PUT_USER_TRANSACTION_SUCCESS,
  payload
})

export const usersPutUserTransactionFail = payload => ({
  type: PUT_USER_TRANSACTION_FAIL,
  payload
})
