export const GET_COUNTRIES = 'analytics/POST_COUNTRIES'
export const GET_COUNTRIES_SUCCESS = 'analytics/POST_COUNTRIES_SUCCESS'
export const GET_COUNTRIES_FAIL = 'analytics/POST_COUNTRIES_FAIL'

export const GET_BRAND_SALES = 'analytics/POST_BRAND_SALES'
export const GET_BRAND_SALES_SUCCESS = 'analytics/POST_BRAND_SALES_SUCCESS'
export const GET_BRAND_SALES_FAIL = 'analytics/POST_BRAND_SALES_FAIL'

export const GET_CAMPAIGNS = 'analytics/POST_CAMPAIGNS'
export const GET_CAMPAIGNS_SUCCESS = 'analytics/POST_CAMPAIGNS_SUCCESS'
export const GET_CAMPAIGNS_FAIL = 'analytics/POST_CAMPAIGNS_FAIL'

export const GET_CAMPAIGNS_CHART = 'analytics/GET_CAMPAIGNS_CHART'
export const GET_CAMPAIGNS_CHART_SUCCESS = 'analytics/GET_CAMPAIGNS_CHART_SUCCESS'
export const GET_CAMPAIGNS_CHART_FAIL = 'analytics/GET_CAMPAIGNS_CHART_FAIL'

export const GET_REWARDS_INDICATORS = 'analytics/GET_REWARDS_INDICATORS'
export const GET_REWARDS_INDICATORS_SUCCESS = 'analytics/GET_REWARDS_INDICATORS_SUCCESS'
export const GET_REWARDS_INDICATORS_FAIL = 'analytics/GET_REWARDS_INDICATORS_FAIL'

export const analyticsGetCountries = () => ({
  type: GET_COUNTRIES
})

export const analyticsGetCountriesSuccess = payload => ({
  type: GET_COUNTRIES_SUCCESS,
  payload
})

export const analyticsGetCountriesFail = error => ({
  type: GET_COUNTRIES_FAIL,
  payload: {
    error
  }
})

export const analyticsGetBrandSales = () => ({
  type: GET_BRAND_SALES
})

export const analyticsGetBrandSalesSuccess = payload => ({
  type: GET_BRAND_SALES_SUCCESS,
  payload
})

export const analyticsGetBrandSalesFail = error => ({
  type: GET_BRAND_SALES_FAIL,
  payload: {
    error
  }
})

export const analyticsGetCampaigns = () => ({
  type: GET_CAMPAIGNS
})

export const analyticsGetCampaignsSuccess = payload => ({
  type: GET_CAMPAIGNS_SUCCESS,
  payload
})

export const analyticsGetCampaignsFail = error => ({
  type: GET_CAMPAIGNS_FAIL,
  payload: {
    error
  }
})

export const analyticsGetCampaignsChart = payload => ({
  type: GET_CAMPAIGNS_CHART,
  payload
})

export const analyticsGetCampaignsChartSuccess = payload => ({
  type: GET_CAMPAIGNS_CHART_SUCCESS,
  payload
})

export const analyticsGetCampaignsChartFail = payload => ({
  type: GET_CAMPAIGNS_CHART_FAIL,
  payload
})

export const analyticsGetRewardsIndicators = payload => ({
  type: GET_REWARDS_INDICATORS,
  payload
})

export const analyticsGetRewardsIndicatorsSuccess = payload => ({
  type: GET_REWARDS_INDICATORS_SUCCESS,
  payload
})

export const analyticsGetRewardsIndicatorsFail = payload => ({
  type: GET_REWARDS_INDICATORS_FAIL,
  payload
})
