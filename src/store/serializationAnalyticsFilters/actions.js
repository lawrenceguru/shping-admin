export const GET_SELECT_RANGE = 'serializationAnalyticsFIlters/POST_SELECT_RANGE'
export const GET_RANGE_DATES = 'serializationAnalyticsFIlters/GET_RANGE_DATES'
export const LOAD_NEW_FILTER_INFO = 'serializationAnalyticsFIlters/POST_LOAD_NEW_FILTER_INFO'
export const SET_CURRENT_TAB = 'serializationAnalyticsFIlters/SET_CURRENT_TAB'
export const CLEAR_FILTERS = 'serializationAnalyticsFIlters/CLEAR_FILTERS'
export const GET_SELECT_CUSTOMER = 'serializationAnalyticsFIlters/GET_SELECT_CUSTOMER'

export const serializationFilterAnalyticsSetSelectRange = payload => ({
  type: GET_SELECT_RANGE,
  payload
})

export const serializationFilterAnalyticsSetRangeDates = payload => ({
  type: GET_RANGE_DATES,
  payload
})

export const serializationFilterAnalyticsGetSelectCustomer = payload => ({
  type: GET_SELECT_CUSTOMER,
  payload
})

export const serializationFilterAnalyticsLoadNewFilterInfo = payload => ({
  type: LOAD_NEW_FILTER_INFO,
  payload
})

export const serializationFilterAnalyticsSetCurrentTab = payload => ({
  type: SET_CURRENT_TAB,
  payload
})

export const serializationFilterAnalyticClearFilters = () => ({
  type: CLEAR_FILTERS
})
