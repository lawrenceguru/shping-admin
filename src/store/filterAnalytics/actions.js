export const GET_SELECT_RANGE = 'filterAnalytics/POST_SELECT_RANGE'
export const GET_SELECT_COUNTRY = 'filterAnalytics/POST_SELECT_COUNTRY'
export const GET_RANGE_DATES = 'filterAnalytics/GET_RANGE_DATES'
export const GET_FIRST_DATE = 'filterAnalytics/POST_FIRST_DATE'
export const GET_SELECT_STATE = 'filterAnalytics/GET_SELECT_STATE'
export const GET_SELECT_CITY = 'filterAnalytics/GET_SELECT_CITY'
export const GET_SELECT_POSTCODE = 'filterAnalytics/GET_SELECT_POSTCODE'
export const GET_SECOND_DATE = 'filterAnalytics/POST_SECOND_DATE'
export const GET_SELECT_BRAND = 'filterAnalytics/GET_SELECT_BRAND'
export const LOAD_NEW_FILTER_INFO = 'filterAnalytics/POST_LOAD_NEW_FILTER_INFO'
export const SET_CURRENT_TAB = 'filterAnalytics/SET_CURRENT_TAB'
export const CLEAR_FILTERS = 'filterAnalytics/CLEAR_FILTERS'
export const GET_SELECT_GTIN = 'filterAnalytics/GET_SELECT_GTIN'
export const GET_ADS_MODE = 'filterAnalytics/GET_ADS_MODE'

export const filterAnalyticsSetSelectRange = payload => ({
  type: GET_SELECT_RANGE,
  payload
})

export const filterAnalyticsSetSelectCountry = payload => ({
  type: GET_SELECT_COUNTRY,
  payload
})

export const filterAnalyticsGetRangesDates = payload => ({
  type: GET_RANGE_DATES,
  payload
})

export const filterAnalyticsSetSelectGtin = payload => ({
  type: GET_SELECT_GTIN,
  payload
})

export const filterAnalyticsSetFirstDate = payload => ({
  type: GET_FIRST_DATE,
  payload
})

export const filterAnalyticsSetSecondDate = payload => ({
  type: GET_SECOND_DATE,
  payload
})

export const filterAnalyticsSetState = payload => ({
  type: GET_SELECT_STATE,
  payload
})

export const filterAnalyticsSetPostcode = payload => ({
  type: GET_SELECT_POSTCODE,
  payload
})

export const filterAnalyticsSetCity = payload => ({
  type: GET_SELECT_CITY,
  payload
})

export const filterAnalyticsSetSelectBrand = payload => ({
  type: GET_SELECT_BRAND,
  payload
})

export const filterAnalyticsLoadNewFilterInfo = payload => ({
  type: LOAD_NEW_FILTER_INFO,
  payload
})

export const filterAnalyticsSetCurrentTab = payload => ({
  type: SET_CURRENT_TAB,
  payload
})

export const filterAnalyticClearFilters = () => ({
  type: CLEAR_FILTERS
})

export const filterAnalyticSetAdsMode = payload => ({
  type: GET_ADS_MODE,
  payload
})
