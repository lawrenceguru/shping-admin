import { currDate, prevDate } from '../../utils/filtersDates'

export const initialState = {
  selectRange: 'get_days',
  selectCountry: 'any',
  selectBrand: 'any',
  selectCity: 'any',
  selectGtin: [],
  selectFirstDate: prevDate,
  selectSecondDate: currDate,
  currentTab: 'overview',
  adsMode: 'product'
}

export const analyticsSelector = state => state.filterAnalytics || initialState.filterAnalytics
export const tabSelector = state => state.filterAnalytics.currentTab || initialState.currentTab
