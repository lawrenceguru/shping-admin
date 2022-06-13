export const GET_FEATURED_LIST = 'campaings/GET_FEATURED_LIST'
export const GET_FEATURED_LIST_SUCCESS = 'campaings/GET_FEATURED_LIST_SUCCESS'
export const GET_FEATURED_LIST_FAIL = 'campaings/GET_FEATURED_LIST_FAIL'

export const FEATURED_STATUS_TOGGLE = 'campaings/FEATURED_STATUS_TOGGLE'
export const FEATURED_STATUS_TOGGLE_SUCCESS = 'campaings/FEATURED_STATUS_TOGGLE_SUCCESS'
export const FEATURED_STATUS_TOGGLE_FAIL = 'campaings/FEATURED_STATUS_TOGGLE_FAIL'

export const GET_FEATURED_CHART = 'campaigns/GET_FEATURED_CHART'
export const GET_FEATURED_CHART_SUCCESS = 'campaigns/GET_FEATURED_CHART_SUCCESS'
export const GET_FEATURED_CHART_FAIL = 'campaigns/GET_FEATURED_CHART_FAIL'

export const POST_CAMPAIGN_FEATURED = 'campaigns/POST_CAMPAIGN_FEATURED'
export const POST_CAMPAIGN_FEATURED_SUCCESS = 'campaigns/POST_CAMPAIGN_FEATURED_SUCCESS'
export const POST_CAMPAIGN_FEATURED_FAIL = 'campaigns/POST_CAMPAIGN_FEATURED_FAIL'

export const PUT_CAMPAIGN_FEATURED = 'campaigns/PUT_CAMPAIGN_FEATURED'
export const PUT_CAMPAIGN_FEATURED_SUCCESS = 'campaigns/PUT_CAMPAIGN_FEATURED_SUCCESS'
export const PUT_CAMPAIGN_FEATURED_FAIL = 'campaigns/PUT_CAMPAIGN_FEATURED_FAIL'

export const campaignsFeaturedGetFeaturedList = payload => ({
  type: GET_FEATURED_LIST,
  payload
})

export const campaignsFeaturedGetFeaturedListSuccess = payload => ({
  type: GET_FEATURED_LIST_SUCCESS,
  payload
})

export const campaignsFeaturedGetFeaturedListFail = payload => ({
  type: GET_FEATURED_LIST_FAIL,
  payload
})

export const campaignsFeaturedStatusToggle = payload => ({
  type: FEATURED_STATUS_TOGGLE,
  payload
})

export const campaignsFeaturedStatusToggleSuccess = payload => ({
  type: FEATURED_STATUS_TOGGLE_SUCCESS,
  payload
})

export const campaignsFeaturedStatusToggleFail = payload => ({
  type: FEATURED_STATUS_TOGGLE_FAIL,
  payload
})

export const campaignsFeaturedGetFeaturedChart = payload => ({
  type: GET_FEATURED_CHART,
  payload
})

export const campaignsFeaturedGetFeaturedChartSuccess = payload => ({
  type: GET_FEATURED_CHART_SUCCESS,
  payload
})

export const campaignsFeaturedGetFeaturedChartFail = payload => ({
  type: GET_FEATURED_CHART_FAIL,
  payload
})

export const campaignsFeaturedPostCampaignFeatured = payload => ({
  type: POST_CAMPAIGN_FEATURED,
  payload
})

export const campaignsFeaturedPostCampaignFeaturedSuccess = payload => ({
  type: POST_CAMPAIGN_FEATURED_SUCCESS,
  payload
})

export const campaignsFeaturedPostCampaignFeaturedFail = payload => ({
  type: POST_CAMPAIGN_FEATURED_FAIL,
  payload
})

export const campaignsFeaturedPutCampaignFeatured = payload => ({
  type: PUT_CAMPAIGN_FEATURED,
  payload
})

export const campaignsFeaturedPutCampaignFeaturedSuccess = payload => ({
  type: PUT_CAMPAIGN_FEATURED_SUCCESS,
  payload
})

export const campaignsFeaturedPutCampaignFeaturedFail = payload => ({
  type: PUT_CAMPAIGN_FEATURED_FAIL,
  payload
})
