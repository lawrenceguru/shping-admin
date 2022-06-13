import { currDate, prevDate } from '../../utils/filtersDates'

export const initialState = {
  dateAs: 'day',
  issuer: 'any',
  fromDate: prevDate,
  toDate: currDate,
  currentTab: 'overview'
}

export const analyticsSelector = state => state.serializationAnalyticsFilters || initialState
export const tabSelector = state => state.serializationAnalyticsFilters.currentTab || initialState.currentTab
