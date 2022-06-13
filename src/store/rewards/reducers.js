import {
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGNS_FAIL,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAIL,
  PUT_STATUS_OF_CAMPAIGN,
  PUT_STATUS_OF_CAMPAIGN_SUCCESS,
  PUT_STATUS_OF_CAMPAIGN_FAIL,
  POST_CAMPAIGN,
  POST_CAMPAIGN_SUCCESS,
  POST_CAMPAIGN_FAIL,
  PUT_CAMPAIGN,
  PUT_CAMPAIGN_SUCCESS,
  PUT_CAMPAIGN_FAIL,
  GET_CAMPAIGN_BOTS,
  GET_CAMPAIGN_BOTS_SUCCESS,
  GET_CAMPAIGN_BOTS_FAIL,
  DELETE_CAMPAIGN_BOT,
  DELETE_CAMPAIGN_BOT_SUCCESS,
  DELETE_CAMPAIGN_BOT_FAIL,
  CREATE_CAMPAIGN_BOT,
  CREATE_CAMPAIGN_BOT_SUCCESS,
  CREATE_CAMPAIGN_BOT_FAIL,
  UPDATE_CAMPAIGN_BOT,
  UPDATE_CAMPAIGN_BOT_SUCCESS,
  UPDATE_CAMPAIGN_BOT_FAIL,
  DUPLICATE_CAMPAIGN_BOT,
  CLEAR_SELECTED_DUPLICATED_CAMPAIGN_BOT,
  DUPLICATE_CAMPAIGN,
  CLEAR_SELECTED_DUPLICATED_CAMPAIGN,
  GET_CAMPAIGN_SHOUTOUTS,
  GET_CAMPAIGN_SHOUTOUTS_SUCCESS,
  GET_CAMPAIGN_SHOUTOUTS_FAIL,
  DELETE_CAMPAIGN_SHOUTOUTS,
  DELETE_CAMPAIGN_SHOUTOUTS_SUCCESS,
  DELETE_CAMPAIGN_SHOUTOUTS_FAIL,
  CREATE_CAMPAIGN_SHOUTOUT,
  CREATE_CAMPAIGN_SHOUTOUT_SUCCESS,
  CREATE_CAMPAIGN_SHOUTOUT_FAIL,
  UPDATE_CAMPAIGN_SHOUTOUT,
  UPDATE_CAMPAIGN_SHOUTOUT_SUCCESS,
  UPDATE_CAMPAIGN_SHOUTOUT_FAIL,
  DUPLICATE_CAMPAIGN_SHOUTOUT,
  CLEAR_SELECTED_DUPLICATED_CAMPAIGN_SHOUTOUT,
  GET_CAMPAIGN_BOOSTS,
  GET_CAMPAIGN_BOOSTS_SUCCESS,
  GET_CAMPAIGN_BOOSTS_FAIL,
  CAMPAIGN_BOOST_STATUS_TOGGLE,
  CAMPAIGN_BOOST_STATUS_TOGGLE_SUCCESS,
  CAMPAIGN_BOOST_STATUS_TOGGLE_FAIL,
  PUT_CAMPAIGN_BOOST,
  PUT_CAMPAIGN_BOOST_SUCCESS,
  PUT_CAMPAIGN_BOOST_FAIL,
  POST_CAMPAIGN_BOOST,
  POST_CAMPAIGN_BOOST_SUCCESS,
  POST_CAMPAIGN_BOOST_FAIL,
  GET_CAMPAIGN_REMINDER,
  GET_CAMPAIGN_REMINDER_SUCCESS,
  GET_CAMPAIGN_REMINDER_FAIL,
  CAMPAIGN_REMINDER_STATUS_TOGGLE,
  CAMPAIGN_REMINDER_STATUS_TOGGLE_SUCCESS,
  CAMPAIGN_REMINDER_STATUS_TOGGLE_FAIL,
  POST_CAMPAIGN_REMINDER,
  POST_CAMPAIGN_REMINDER_SUCCESS,
  POST_CAMPAIGN_REMINDER_FAIL,
  PUT_CAMPAIGN_REMINDER,
  PUT_CAMPAIGN_REMINDER_SUCCESS,
  PUT_CAMPAIGN_REMINDER_FAIL,
  GET_ADJUSTMENT_BUDGET_RATE,
  GET_ADJUSTMENT_BUDGET_RATE_SUCCESS,
  GET_ADJUSTMENT_BUDGET_RATE_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAMPAIGNS:
      return {
        ...state,
        isLoadingCampaigns: true,
        updated: false,
        duplicateIdCampaign: null
      }
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        isLoadingCampaigns: false,
        campaigns: payload
      }
    case GET_CAMPAIGNS_FAIL:
      return {
        ...state,
        isLoadingCampaigns: false
      }
    case DELETE_CAMPAIGN:
      return {
        ...state,
        isDeleting: true
      }
    case DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isDeleting: false
      }
    case DELETE_CAMPAIGN_FAIL:
      return {
        ...state,
        isDeleting: false
      }
    case PUT_STATUS_OF_CAMPAIGN:
      return {
        ...state,
        isLoadingActivation: true
      }
    case PUT_STATUS_OF_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isLoadingActivation: false
      }
    case PUT_STATUS_OF_CAMPAIGN_FAIL:
      return {
        ...state,
        isLoadingActivation: false
      }
    case POST_CAMPAIGN:
      return {
        ...state,
        isLoading: true,
        updated: false
      }
    case POST_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updated: true,
        duplicateIdCampaign: null
      }
    case POST_CAMPAIGN_FAIL:
      return {
        ...state,
        isLoading: false,
        updated: false
      }
    case PUT_CAMPAIGN:
      return {
        ...state,
        isLoading: true,
        updated: false
      }
    case PUT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updated: true
      }
    case PUT_CAMPAIGN_FAIL:
      return {
        ...state,
        isLoading: false,
        updated: false
      }
    case GET_CAMPAIGN_BOTS:
      return {
        ...state,
        isLoadingBots: true,
        updatedBot: false,
        duplicateId: null
      }
    case GET_CAMPAIGN_BOTS_SUCCESS:
      return {
        ...state,
        isLoadingBots: false,
        bots: payload
      }
    case GET_CAMPAIGN_BOTS_FAIL:
      return {
        ...state,
        isLoadingBots: false
      }
    case DELETE_CAMPAIGN_BOT:
      return {
        ...state,
        isBotDeleting: true
      }
    case DELETE_CAMPAIGN_BOT_SUCCESS:
      return {
        ...state,
        isBotDeleting: false
      }
    case DELETE_CAMPAIGN_BOT_FAIL:
      return {
        ...state,
        isBotDeleting: false
      }
    case CREATE_CAMPAIGN_BOT:
      return {
        ...state,
        isLoadingBot: true,
        updatedBot: false,
        duplicateId: null
      }
    case CREATE_CAMPAIGN_BOT_SUCCESS:
      return {
        ...state,
        isLoadingBot: false,
        updatedBot: true,
        duplicateId: null
      }
    case CREATE_CAMPAIGN_BOT_FAIL:
      return {
        ...state,
        isLoadingBot: false,
        updatedBot: false
      }
    case UPDATE_CAMPAIGN_BOT:
      return {
        ...state,
        isLoadingBot: true,
        updatedBot: false,
        duplicateId: null
      }
    case UPDATE_CAMPAIGN_BOT_SUCCESS:
      return {
        ...state,
        isLoadingBot: false,
        updatedBot: true,
        duplicateId: null
      }
    case UPDATE_CAMPAIGN_BOT_FAIL:
      return {
        ...state,
        isLoadingBot: false,
        updatedBot: false
      }
    case DUPLICATE_CAMPAIGN_BOT:
      return {
        ...state,
        duplicateId: payload
      }
    case CLEAR_SELECTED_DUPLICATED_CAMPAIGN_BOT:
      return {
        ...state,
        duplicateId: null
      }
    case GET_CAMPAIGN_SHOUTOUTS:
      return {
        ...state,
        isLoadingShoutouts: true,
        updatedShoutout: false,
        duplicateIdShoutout: null
      }
    case GET_CAMPAIGN_SHOUTOUTS_SUCCESS:
      return {
        ...state,
        isLoadingShoutouts: false,
        shoutouts: payload
      }
    case GET_CAMPAIGN_SHOUTOUTS_FAIL:
      return {
        ...state,
        isLoadingShoutouts: false
      }
    case DELETE_CAMPAIGN_SHOUTOUTS:
      return {
        ...state,
        isShoutoutDeleting: true
      }
    case DELETE_CAMPAIGN_SHOUTOUTS_SUCCESS:
      return {
        ...state,
        isShoutoutDeleting: false
      }
    case DELETE_CAMPAIGN_SHOUTOUTS_FAIL:
      return {
        ...state,
        isShoutoutDeleting: false
      }
    case DUPLICATE_CAMPAIGN:
      return {
        ...state,
        duplicateIdCampaign: payload
      }
    case CLEAR_SELECTED_DUPLICATED_CAMPAIGN:
      return {
        ...state,
        duplicateIdCampaign: null
      }
    case CREATE_CAMPAIGN_SHOUTOUT:
      return {
        ...state,
        isLoadingShoutout: true,
        updatedShoutout: false
      }
    case CREATE_CAMPAIGN_SHOUTOUT_SUCCESS:
      return {
        ...state,
        isLoadingShoutout: false,
        updatedShoutout: true,
        duplicateIdShoutout: null
      }
    case CREATE_CAMPAIGN_SHOUTOUT_FAIL:
      return {
        ...state,
        isLoadingShoutout: false,
        updatedShoutout: false
      }
    case UPDATE_CAMPAIGN_SHOUTOUT:
      return {
        ...state,
        isLoadingShoutout: true,
        updatedShoutout: false
      }
    case UPDATE_CAMPAIGN_SHOUTOUT_SUCCESS:
      return {
        ...state,
        isLoadingShoutout: false,
        updatedShoutout: true,
        duplicateIdShoutout: null
      }
    case UPDATE_CAMPAIGN_SHOUTOUT_FAIL:
      return {
        ...state,
        isLoadingShoutout: false,
        updatedShoutout: false
      }
    case DUPLICATE_CAMPAIGN_SHOUTOUT:
      return {
        ...state,
        duplicateIdShoutout: payload
      }
    case CLEAR_SELECTED_DUPLICATED_CAMPAIGN_SHOUTOUT:
      return {
        ...state,
        duplicateIdShoutout: null
      }
    case GET_CAMPAIGN_BOOSTS:
      return {
        ...state,
        isLoadingBoosts: true,
        updatedBoosts: false
      }
    case GET_CAMPAIGN_BOOSTS_SUCCESS:
      return {
        ...state,
        isLoadingBoosts: false,
        boosts: payload
      }
    case GET_CAMPAIGN_BOOSTS_FAIL:
      return {
        ...state,
        isLoadingBoosts: false
      }
    case CAMPAIGN_BOOST_STATUS_TOGGLE:
      return {
        ...state,
        activatedBoostId: payload.id
      }
    case CAMPAIGN_BOOST_STATUS_TOGGLE_SUCCESS:
      return {
        ...state,
        activatedBoostId: null
      }
    case CAMPAIGN_BOOST_STATUS_TOGGLE_FAIL:
      return {
        ...state,
        activatedBoostId: null
      }
    case POST_CAMPAIGN_BOOST:
      return {
        ...state,
        isLoadingBoosts: true,
        updatedBoosts: false
      }
    case POST_CAMPAIGN_BOOST_SUCCESS:
      return {
        ...state,
        isLoadingBoosts: false,
        updatedBoosts: true
      }
    case POST_CAMPAIGN_BOOST_FAIL:
      return {
        ...state,
        isLoadingBoosts: false,
        updatedBoosts: false
      }
    case PUT_CAMPAIGN_BOOST:
      return {
        ...state,
        isLoadingBoosts: true,
        updatedBoosts: false
      }
    case PUT_CAMPAIGN_BOOST_SUCCESS:
      return {
        ...state,
        isLoadingBoosts: false,
        updatedBoosts: true
      }
    case PUT_CAMPAIGN_BOOST_FAIL:
      return {
        ...state,
        isLoadingBoosts: false,
        updatedBoosts: false
      }
    case GET_CAMPAIGN_REMINDER:
      return {
        ...state,
        isLoadingReminders: true,
        updatedReminder: false
      }
    case GET_CAMPAIGN_REMINDER_SUCCESS:
      return {
        ...state,
        reminders: payload,
        isLoadingReminders: false
      }
    case GET_CAMPAIGN_REMINDER_FAIL:
      return {
        ...state,
        isLoadingReminders: false
      }
    case CAMPAIGN_REMINDER_STATUS_TOGGLE:
      return {
        ...state,
        isActivatedReminder: true
      }
    case CAMPAIGN_REMINDER_STATUS_TOGGLE_SUCCESS:
      return {
        ...state,
        isActivatedReminder: false
      }
    case CAMPAIGN_REMINDER_STATUS_TOGGLE_FAIL:
      return {
        ...state,
        isActivatedReminder: false
      }
    case POST_CAMPAIGN_REMINDER:
      return {
        ...state,
        isLoadingReminders: true,
        updatedReminder: false
      }
    case POST_CAMPAIGN_REMINDER_SUCCESS:
      return {
        ...state,
        isLoadingReminders: false,
        updatedReminder: true
      }
    case POST_CAMPAIGN_REMINDER_FAIL:
      return {
        ...state,
        isLoadingReminders: false,
        updatedReminder: false
      }
    case PUT_CAMPAIGN_REMINDER:
      return {
        ...state,
        isLoadingReminders: true,
        updatedReminder: false
      }
    case PUT_CAMPAIGN_REMINDER_SUCCESS:
      return {
        ...state,
        isLoadingReminders: false,
        updatedReminder: true
      }
    case PUT_CAMPAIGN_REMINDER_FAIL:
      return {
        ...state,
        isLoadingReminders: false,
        updatedReminder: false
      }
    case GET_ADJUSTMENT_BUDGET_RATE:
      return {
        ...state
      }
    case GET_ADJUSTMENT_BUDGET_RATE_SUCCESS:
      return {
        ...state,
        points: payload
      }
    case GET_ADJUSTMENT_BUDGET_RATE_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
