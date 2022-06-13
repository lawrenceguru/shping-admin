export const GET_CAMPAIGNS = 'rewards/GET_CAMPAIGNS'
export const GET_CAMPAIGNS_SUCCESS = 'rewards/GET_CAMPAIGNS_SUCCESS'
export const GET_CAMPAIGNS_FAIL = 'rewards/GET_CAMPAIGNS_FAIL'

export const DELETE_CAMPAIGN = 'rewards/DELETE_CAMPAIGN'
export const DELETE_CAMPAIGN_SUCCESS = 'rewards/DELETE_CAMPAIGN_SUCCESS'
export const DELETE_CAMPAIGN_FAIL = 'rewards/DELETE_CAMPAIGN_FAIL'

export const PUT_STATUS_OF_CAMPAIGN = 'rewards/PUT_STATUS_OF_CAMPAIGN'
export const PUT_STATUS_OF_CAMPAIGN_SUCCESS = 'rewards/PUT_STATUS_OF_CAMPAIGN_SUCCESS'
export const PUT_STATUS_OF_CAMPAIGN_FAIL = 'rewards/PUT_STATUS_OF_CAMPAIGN_FAIL'

export const POST_CAMPAIGN = 'rewards/POST_CAMPAIGN'
export const POST_CAMPAIGN_SUCCESS = 'rewards/POST_CAMPAIGN_SUCCESS'
export const POST_CAMPAIGN_FAIL = 'rewards/POST_CAMPAIGN_FAIL'

export const PUT_CAMPAIGN = 'rewards/PUT_CAMPAIGN'
export const PUT_CAMPAIGN_SUCCESS = 'rewards/PUT_CAMPAIGN_SUCCESS'
export const PUT_CAMPAIGN_FAIL = 'rewards/PUT_CAMPAIGN_FAIL'

export const GET_CAMPAIGN_BOTS = 'rewards/GET_CAMPAIGN_BOTS'
export const GET_CAMPAIGN_BOTS_SUCCESS = 'rewards/GET_CAMPAIGN_BOTS_SUCCESS'
export const GET_CAMPAIGN_BOTS_FAIL = 'rewards/GET_CAMPAIGN_BOTS_FAIL'

export const DELETE_CAMPAIGN_BOT = 'rewards/DELETE_CAMPAIGN_BOT'
export const DELETE_CAMPAIGN_BOT_SUCCESS = 'rewards/DELETE_CAMPAIGN_BOT_SUCCESS'
export const DELETE_CAMPAIGN_BOT_FAIL = 'rewards/DELETE_CAMPAIGN_BOT_FAIL'

export const CREATE_CAMPAIGN_BOT = 'rewards/CREATE_CAMPAIGN_BOT'
export const CREATE_CAMPAIGN_BOT_SUCCESS = 'rewards/CREATE_CAMPAIGN_BOT_SUCCESS'
export const CREATE_CAMPAIGN_BOT_FAIL = 'rewards/CREATE_CAMPAIGN_BOT_FAIL'

export const UPDATE_CAMPAIGN_BOT = 'rewards/UPDATE_CAMPAIGN_BOT'
export const UPDATE_CAMPAIGN_BOT_SUCCESS = 'rewards/UPDATE_CAMPAIGN_BOT_SUCCESS'
export const UPDATE_CAMPAIGN_BOT_FAIL = 'rewards/UPDATE_CAMPAIGN_BOT_FAIL'

export const DUPLICATE_CAMPAIGN_BOT = 'rewards/DUPLICATE_CAMPAIGN_BOT'
export const CLEAR_SELECTED_DUPLICATED_CAMPAIGN_BOT = 'rewards/CLEAR_SELECTED_DUPLICATED_CAMPAIGN_BOT'

export const DUPLICATE_CAMPAIGN = 'rewards/DUPLICATE_CAMPAIGN'
export const CLEAR_SELECTED_DUPLICATED_CAMPAIGN = 'rewards/CLEAR_SELECTED_DUPLICATED_CAMPAIGN'

export const GET_CAMPAIGN_SHOUTOUTS = 'rewards/GET_CAMPAIGN_SHOUTOUTS'
export const GET_CAMPAIGN_SHOUTOUTS_SUCCESS = 'rewards/GET_CAMPAIGN_SHOUTOUTS_SUCCESS'
export const GET_CAMPAIGN_SHOUTOUTS_FAIL = 'rewards/GET_CAMPAIGN_SHOUTOUTS_FAIL'

export const DELETE_CAMPAIGN_SHOUTOUTS = 'rewards/DELETE_CAMPAIGN_SHOUTOUTS'
export const DELETE_CAMPAIGN_SHOUTOUTS_SUCCESS = 'rewards/DELETE_CAMPAIGN_SHOUTOUTS_SUCCESS'
export const DELETE_CAMPAIGN_SHOUTOUTS_FAIL = 'rewards/DELETE_CAMPAIGN_SHOUTOUTS_FAIL'

export const CREATE_CAMPAIGN_SHOUTOUT = 'rewards/CREATE_CAMPAIGN_SHOUTOUT'
export const CREATE_CAMPAIGN_SHOUTOUT_SUCCESS = 'rewards/CREATE_CAMPAIGN_SHOUTOUT_SUCCESS'
export const CREATE_CAMPAIGN_SHOUTOUT_FAIL = 'rewards/CREATE_CAMPAIGN_SHOUTOUT_FAIL'

export const UPDATE_CAMPAIGN_SHOUTOUT = 'rewards/UPDATE_CAMPAIGN_SHOUTOUT'
export const UPDATE_CAMPAIGN_SHOUTOUT_SUCCESS = 'rewards/UPDATE_CAMPAIGN_SHOUTOUT_SUCCESS'
export const UPDATE_CAMPAIGN_SHOUTOUT_FAIL = 'rewards/UPDATE_CAMPAIGN_SHOUTOUT_FAIL'

export const DUPLICATE_CAMPAIGN_SHOUTOUT = 'rewards/DUPLICATE_CAMPAIGN_SHOUTOUT'
export const CLEAR_SELECTED_DUPLICATED_CAMPAIGN_SHOUTOUT = 'rewards/CLEAR_SELECTED_DUPLICATED_CAMPAIGN_SHOUTOUT'

export const GET_CAMPAIGN_BOOSTS = 'rewards/GET_CAMPAIGN_BOOSTS'
export const GET_CAMPAIGN_BOOSTS_SUCCESS = 'rewards/GET_CAMPAIGN_BOOSTS_SUCCESS'
export const GET_CAMPAIGN_BOOSTS_FAIL = 'rewards/GET_CAMPAIGN_BOOSTS_FAIL'

export const CAMPAIGN_BOOST_STATUS_TOGGLE = 'rewards/CAMPAIGN_BOOST_STATUS_TOGGLE'
export const CAMPAIGN_BOOST_STATUS_TOGGLE_SUCCESS = 'rewards/CAMPAIGN_BOOST_STATUS_TOGGLE_SUCCESS'
export const CAMPAIGN_BOOST_STATUS_TOGGLE_FAIL = 'rewards/CAMPAIGN_BOOST_STATUS_TOGGLE_FAIL'

export const POST_CAMPAIGN_BOOST = 'rewards/POST_CAMPAIGN_BOOST'
export const POST_CAMPAIGN_BOOST_SUCCESS = 'rewards/POST_CAMPAIGN_BOOST_SUCCESS'
export const POST_CAMPAIGN_BOOST_FAIL = 'rewards/POST_CAMPAIGN_BOOST_FAIL'

export const PUT_CAMPAIGN_BOOST = 'rewards/PUT_CAMPAIGN_BOOST'
export const PUT_CAMPAIGN_BOOST_SUCCESS = 'rewards/PUT_CAMPAIGN_BOOST_SUCCESS'
export const PUT_CAMPAIGN_BOOST_FAIL = 'rewards/PUT_CAMPAIGN_BOOST_FAIL'

export const GET_CAMPAIGN_REMINDER = 'rewards/GET_CAMPAIGN_REMINDER'
export const GET_CAMPAIGN_REMINDER_SUCCESS = 'rewards/GET_CAMPAIGN_REMINDER_SUCCESS'
export const GET_CAMPAIGN_REMINDER_FAIL = 'rewards/GET_CAMPAIGN_REMINDER_FAIL'

export const CAMPAIGN_REMINDER_STATUS_TOGGLE = 'rewards/CAMPAIGN_REMINDER_STATUS_TOGGLE'
export const CAMPAIGN_REMINDER_STATUS_TOGGLE_SUCCESS = 'rewards/CAMPAIGN_REMINDER_STATUS_TOGGLE_SUCCESS'
export const CAMPAIGN_REMINDER_STATUS_TOGGLE_FAIL = 'rewards/CAMPAIGN_REMINDER_STATUS_TOGGLE_FAIL'

export const POST_CAMPAIGN_REMINDER = 'rewards/POST_CAMPAIGN_REMINDER'
export const POST_CAMPAIGN_REMINDER_SUCCESS = 'rewards/POST_CAMPAIGN_REMINDER_SUCCESS'
export const POST_CAMPAIGN_REMINDER_FAIL = 'rewards/POST_CAMPAIGN_REMINDER_FAIL'

export const PUT_CAMPAIGN_REMINDER = 'rewards/PUT_CAMPAIGN_REMINDER'
export const PUT_CAMPAIGN_REMINDER_SUCCESS = 'rewards/PUT_CAMPAIGN_REMINDER_SUCCESS'
export const PUT_CAMPAIGN_REMINDER_FAIL = 'rewards/PUT_CAMPAIGN_REMINDER_FAIL'

export const GET_ADJUSTMENT_BUDGET_RATE = 'rewards/GET_ADJUSTMENT_BUDGET_RATE'
export const GET_ADJUSTMENT_BUDGET_RATE_SUCCESS = 'rewards/GET_ADJUSTMENT_BUDGET_RATE_SUCCESS'
export const GET_ADJUSTMENT_BUDGET_RATE_FAIL = 'rewards/GET_ADJUSTMENT_BUDGET_RATE_FAIL'

export const rewardsGetCampaigns = payload => ({
  type: GET_CAMPAIGNS,
  payload
})

export const rewardsGetCampaignsSuccess = payload => ({
  type: GET_CAMPAIGNS_SUCCESS,
  payload
})

export const rewardsGetCampaignsFails = payload => ({
  type: GET_CAMPAIGNS_FAIL,
  payload
})

export const rewardsPostCampaign = payload => ({
  type: POST_CAMPAIGN,
  payload
})

export const rewardsPostCampaignSuccess = payload => ({
  type: POST_CAMPAIGN_SUCCESS,
  payload
})

export const rewardsPostCampaignFail = payload => ({
  type: POST_CAMPAIGN_FAIL,
  payload
})

export const rewardsDeleteCampaign = payload => ({
  type: DELETE_CAMPAIGN,
  payload
})

export const rewardsDeleteCampaignSuccess = payload => ({
  type: DELETE_CAMPAIGN_SUCCESS,
  payload
})

export const rewardsDeleteCampaignFail = payload => ({
  type: DELETE_CAMPAIGN_FAIL,
  payload
})

export const rewardsPutStatusOfCampaign = payload => ({
  type: PUT_STATUS_OF_CAMPAIGN,
  payload
})

export const rewardsPutStatusOfCampaignSuccess = payload => ({
  type: PUT_STATUS_OF_CAMPAIGN_SUCCESS,
  payload
})

export const rewardsPutStatusOfCampaignFail = payload => ({
  type: PUT_STATUS_OF_CAMPAIGN_FAIL,
  payload
})

export const rewardsPutCampaign = payload => ({
  type: PUT_CAMPAIGN,
  payload
})

export const rewardsPutCampaignSuccess = payload => ({
  type: PUT_CAMPAIGN_SUCCESS,
  payload
})

export const rewardsPutCampaignFail = payload => ({
  type: PUT_CAMPAIGN_FAIL,
  payload
})

export const rewardsGetCampaignBots = payload => ({
  type: GET_CAMPAIGN_BOTS,
  payload
})

export const rewardsGetCampaignBotsSuccess = payload => ({
  type: GET_CAMPAIGN_BOTS_SUCCESS,
  payload
})

export const rewardsGetCampaignBotsFail = payload => ({
  type: GET_CAMPAIGN_BOTS_FAIL,
  payload
})

export const rewardsDeleteCampaignBot = payload => ({
  type: DELETE_CAMPAIGN_BOT,
  payload
})

export const rewardsDeleteCampaignBotSuccess = payload => ({
  type: DELETE_CAMPAIGN_BOT_SUCCESS,
  payload
})

export const rewardsDeleteCampaignBotFail = payload => ({
  type: DELETE_CAMPAIGN_BOT_FAIL,
  payload
})

export const rewardsCreateCampaignBot = payload => ({
  type: CREATE_CAMPAIGN_BOT,
  payload
})

export const rewardsCreateCampaignBotSuccess = payload => ({
  type: CREATE_CAMPAIGN_BOT_SUCCESS,
  payload
})

export const rewardsCreateCampaignBotFail = payload => ({
  type: CREATE_CAMPAIGN_BOT_FAIL,
  payload
})

export const rewardsUpdateCampaignBot = payload => ({
  type: UPDATE_CAMPAIGN_BOT,
  payload
})

export const rewardsUpdateCampaignBotSuccess = payload => ({
  type: UPDATE_CAMPAIGN_BOT_SUCCESS,
  payload
})

export const rewardsUpdateCampaignBotFail = payload => ({
  type: UPDATE_CAMPAIGN_BOT_FAIL,
  payload
})

export const rewardsDuplicateCampaignBot = payload => ({
  type: DUPLICATE_CAMPAIGN_BOT,
  payload
})

export const rewardsClearSelectedDuplicatedCampaignBot = payload => ({
  type: CLEAR_SELECTED_DUPLICATED_CAMPAIGN_BOT,
  payload
})

export const rewardsDuplicateCampaign = payload => ({
  type: DUPLICATE_CAMPAIGN,
  payload
})

export const rewardsClearSelectedDuplicatedCampaign = payload => ({
  type: CLEAR_SELECTED_DUPLICATED_CAMPAIGN,
  payload
})

export const rewardsGetCampaignShoutouts = payload => ({
  type: GET_CAMPAIGN_SHOUTOUTS,
  payload
})

export const rewardsGetCampaignShoutoutsSuccess = payload => ({
  type: GET_CAMPAIGN_SHOUTOUTS_SUCCESS,
  payload
})

export const rewardsGetCampaignShoutoutsFail = payload => ({
  type: GET_CAMPAIGN_SHOUTOUTS_FAIL,
  payload
})

export const rewardsDeleteCampaignShoutouts = payload => ({
  type: DELETE_CAMPAIGN_SHOUTOUTS,
  payload
})

export const rewardsDeleteCampaignShoutoutsSuccess = payload => ({
  type: DELETE_CAMPAIGN_SHOUTOUTS_SUCCESS,
  payload
})

export const rewardsDeleteCampaignShoutoutsFail = payload => ({
  type: DELETE_CAMPAIGN_SHOUTOUTS_FAIL,
  payload
})

export const rewardsCreateCampaignShoutouts = payload => ({
  type: CREATE_CAMPAIGN_SHOUTOUT,
  payload
})

export const rewardsCreateCampaignShoutoutsSuccess = payload => ({
  type: CREATE_CAMPAIGN_SHOUTOUT_SUCCESS,
  payload
})

export const rewardsCreateCampaignShoutoutsFail = payload => ({
  type: CREATE_CAMPAIGN_SHOUTOUT_FAIL,
  payload
})

export const rewardsUpdateCampaignShoutouts = payload => ({
  type: UPDATE_CAMPAIGN_SHOUTOUT,
  payload
})

export const rewardsUpdateCampaignShoutoutsSuccess = payload => ({
  type: UPDATE_CAMPAIGN_SHOUTOUT_SUCCESS,
  payload
})

export const rewardsUpdateCampaignShoutoutsFail = payload => ({
  type: UPDATE_CAMPAIGN_SHOUTOUT_FAIL,
  payload
})

export const rewardsDuplicateCampaignShoutout = payload => ({
  type: DUPLICATE_CAMPAIGN_SHOUTOUT,
  payload
})

export const rewardsClearSelectedDuplicatedCampaignShoutout = payload => ({
  type: CLEAR_SELECTED_DUPLICATED_CAMPAIGN_SHOUTOUT,
  payload
})

export const rewardsGetCampaignBoosts = payload => ({
  type: GET_CAMPAIGN_BOOSTS,
  payload
})

export const rewardsGetCampaignBoostsSuccess = payload => ({
  type: GET_CAMPAIGN_BOOSTS_SUCCESS,
  payload
})

export const rewardsGetCampaignBoostsFail = payload => ({
  type: GET_CAMPAIGN_BOOSTS_FAIL,
  payload
})

export const rewardsCampaignBoostStatusToggle = payload => ({
  type: CAMPAIGN_BOOST_STATUS_TOGGLE,
  payload
})

export const rewardsCampaignBoostStatusToggleSuccess = payload => ({
  type: CAMPAIGN_BOOST_STATUS_TOGGLE_SUCCESS,
  payload
})

export const rewardsCampaignBoostStatusToggleFail = payload => ({
  type: CAMPAIGN_BOOST_STATUS_TOGGLE_FAIL,
  payload
})

export const rewardsPostCampaignBoost = payload => ({
  type: POST_CAMPAIGN_BOOST,
  payload
})

export const rewardsPostCampaignBoostSuccess = payload => ({
  type: POST_CAMPAIGN_BOOST_SUCCESS,
  payload
})

export const rewardsPostCampaignBoostFail = payload => ({
  type: POST_CAMPAIGN_BOOST_FAIL,
  payload
})

export const rewardsPutCampaignBoost = payload => ({
  type: PUT_CAMPAIGN_BOOST,
  payload
})

export const rewardsPutCampaignBoostSuccess = payload => ({
  type: PUT_CAMPAIGN_BOOST_SUCCESS,
  payload
})

export const rewardsPutCampaignBoostFail = payload => ({
  type: PUT_CAMPAIGN_BOOST_FAIL,
  payload
})

export const rewardsGetCampaignReminders = payload => ({
  type: GET_CAMPAIGN_REMINDER,
  payload
})

export const rewardsGetCampaignRemindersSuccess = payload => ({
  type: GET_CAMPAIGN_REMINDER_SUCCESS,
  payload
})

export const rewardsGetCampaignRemindersFail = payload => ({
  type: GET_CAMPAIGN_REMINDER_FAIL,
  payload
})

export const rewardsCampaignReminderStatusToggle = payload => ({
  type: CAMPAIGN_REMINDER_STATUS_TOGGLE,
  payload
})

export const rewardsCampaignReminderStatusToggleSuccess = payload => ({
  type: CAMPAIGN_REMINDER_STATUS_TOGGLE_SUCCESS,
  payload
})

export const rewardsCampaignReminderStatusToggleFail = payload => ({
  type: CAMPAIGN_REMINDER_STATUS_TOGGLE_FAIL,
  payload
})

export const rewardsPostCampaignReminder = payload => ({
  type: POST_CAMPAIGN_REMINDER,
  payload
})

export const rewardsPostCampaignReminderSuccess = payload => ({
  type: POST_CAMPAIGN_REMINDER_SUCCESS,
  payload
})

export const rewardsPostCampaignReminderFail = payload => ({
  type: POST_CAMPAIGN_REMINDER_FAIL,
  payload
})

export const rewardsPutCampaignReminder = payload => ({
  type: PUT_CAMPAIGN_REMINDER,
  payload
})

export const rewardsPutCampaignReminderSuccess = payload => ({
  type: PUT_CAMPAIGN_REMINDER_SUCCESS,
  payload
})

export const rewardsPutCampaignReminderFail = payload => ({
  type: PUT_CAMPAIGN_REMINDER_FAIL,
  payload
})

export const rewardsGetAdjustmentBudgetRate = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE,
  payload
})

export const rewardsGetAdjustmentBudgetRateSuccess = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE_SUCCESS,
  payload
})

export const rewardsGetAdjustmentBudgetRateFail = payload => ({
  type: GET_ADJUSTMENT_BUDGET_RATE_FAIL,
  payload
})
