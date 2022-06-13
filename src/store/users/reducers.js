import {
  GET_USERS_LIST,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_FAIL,
  GET_BLOCK_STATUS,
  GET_BLOCK_STATUS_SUCCESS,
  GET_BLOCK_STATUS_FAIL,
  GET_BAN_HISTORY,
  GET_BAN_HISTORY_SUCCESS,
  GET_BAN_HISTORY_FAIL,
  SEND_TIMELINE_MESSAGE,
  SEND_TIMELINE_MESSAGE_SUCCESS,
  SEND_TIMELINE_MESSAGE_FAIL,
  SET_REWARDS_BAN,
  SET_REWARDS_BAN_SUCCESS,
  SET_REWARDS_BAN_FAIL,
  SET_BLOCK_STATUS,
  SET_BLOCK_STATUS_SUCCESS,
  SET_BLOCK_STATUS_FAIL,
  GET_USER_LEVELS_INFO,
  GET_USER_LEVELS_INFO_SUCCESS,
  GET_USER_LEVELS_INFO_FAIL,
  GET_CONTRIBUTOR_LEVEL_INFO,
  GET_CONTRIBUTOR_LEVEL_INFO_SUCCESS,
  GET_CONTRIBUTOR_LEVEL_INFO_FAIL,
  GET_USER_REWARDS,
  GET_USER_REWARDS_SUCCESS,
  GET_USER_REWARDS_FAIL,
  GET_USER_BUDDIES,
  GET_USER_BUDDIES_SUCCESS,
  GET_USER_BUDDIES_FAIL,
  GET_USER_FEED,
  GET_USER_FEED_SUCCESS,
  GET_USER_FEED_FAIL,
  CLEAR_USER_INFO,
  GET_USER_SCANS,
  GET_USER_SCANS_SUCCESS,
  GET_USER_SCANS_FAIL,
  GET_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_USER_TRANSACTIONS_FAIL,
  PUT_USER_TRANSACTION,
  PUT_USER_TRANSACTION_SUCCESS,
  PUT_USER_TRANSACTION_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_LIST:
      return {
        ...state,
        isLoading: true,
        filters: {
          ...state.filters,
          ...payload,
          id: undefined
        }
      }
    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload && payload.data,
        count: payload && payload.count
      }
    case GET_USERS_LIST_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_BLOCK_STATUS:
      return {
        ...state,
        isLoading: true
      }
    case GET_BLOCK_STATUS_SUCCESS:
      return {
        ...state,
        isUserBlocked: payload,
        isLoading: false
      }
    case GET_BLOCK_STATUS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_BAN_HISTORY:
      return {
        ...state,
        isLoading: true
      }
    case GET_BAN_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        banHistory: payload
      }
    case GET_BAN_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case SEND_TIMELINE_MESSAGE:
      return {
        ...state
      }
    case SEND_TIMELINE_MESSAGE_SUCCESS:
      return {
        ...state
      }
    case SEND_TIMELINE_MESSAGE_FAIL:
      return {
        ...state
      }
    case SET_REWARDS_BAN:
      return {
        ...state,
        isLoading: true
      }
    case SET_REWARDS_BAN_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case SET_REWARDS_BAN_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case SET_BLOCK_STATUS:
      return {
        ...state,
        isLoading: true
      }
    case SET_BLOCK_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case SET_BLOCK_STATUS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_USER_LEVELS_INFO:
      return {
        ...state,
        isLoadingUserLevels: true
      }
    case GET_USER_LEVELS_INFO_SUCCESS:
      return {
        ...state,
        isLoadingUserLevels: false,
        userLevels: payload
      }
    case GET_USER_LEVELS_INFO_FAIL:
      return {
        ...state,
        isLoadingUserLevels: false
      }
    case GET_CONTRIBUTOR_LEVEL_INFO:
      return {
        ...state,
        isLoadingContributorLevel: true
      }
    case GET_CONTRIBUTOR_LEVEL_INFO_SUCCESS:
      return {
        ...state,
        isLoadingContributorLevel: false,
        contributorLevel: payload
      }
    case GET_CONTRIBUTOR_LEVEL_INFO_FAIL:
      return {
        ...state,
        isLoadingContributorLevel: false
      }
    case GET_USER_REWARDS:
      return {
        ...state,
        isLoadingRewards: true
      }
    case GET_USER_REWARDS_SUCCESS:
      return {
        ...state,
        isLoadingRewards: false,
        rewards: payload && payload.data,
        countRewards: (payload && payload.count) || 0
      }
    case GET_USER_REWARDS_FAIL:
      return {
        ...state,
        isLoadingRewards: false
      }
    case GET_USER_BUDDIES:
      return {
        ...state,
        isLoadingBuddies: true
      }
    case GET_USER_BUDDIES_SUCCESS:
      return {
        ...state,
        buddies: payload,
        isLoadingBuddies: false
      }
    case GET_USER_BUDDIES_FAIL:
      return {
        ...state,
        isLoadingBuddies: false
      }
    case GET_USER_FEED:
      return {
        ...state,
        isLoadingFeed: true
      }
    case GET_USER_FEED_SUCCESS:
      return {
        ...state,
        feed: payload,
        isLoadingFeed: false
      }
    case GET_USER_FEED_FAIL:
      return {
        ...state,
        isLoadingFeed: false
      }
    case CLEAR_USER_INFO:
      return {
        ...state,
        feed: null,
        buddies: null
      }
    case GET_USER_SCANS:
      return {
        ...state,
        isLoadingScans: true
      }
    case GET_USER_SCANS_SUCCESS:
      return {
        ...state,
        isLoadingScans: false,
        countScans: (payload && payload.count) || 0,
        scans: payload && payload.data
      }
    case GET_USER_SCANS_FAIL:
      return {
        ...state,
        isLoadingScans: false
      }
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        isLoadingTransactions: true
      }
    case GET_USER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoadingTransactions: false,
        transactions: payload
      }
    case GET_USER_TRANSACTIONS_FAIL:
      return {
        ...state,
        isLoadingTransactions: false
      }
    case PUT_USER_TRANSACTION:
      return {
        ...state,
        isLoadingTransactions: true
      }
    case PUT_USER_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoadingTransactions: false
      }
    case PUT_USER_TRANSACTION_FAIL:
      return {
        ...state,
        isLoadingTransactions: false
      }
    default:
      return {
        ...state
      }
  }
}
