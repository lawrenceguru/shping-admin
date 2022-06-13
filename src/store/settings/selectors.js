export const initialState = {
  defaultSidebarWidth: 280,
  sidebarWidth: 280,
  displayLanguage: 'en',
  countries: [],
  languages: [],
  timezones: [],
  documentType: null,
  isLoadingType: false,
  isLoadingTimezones: false,
  rewardsActions: [],
  isLoadingActions: false,
  activeUsersCount: 0
}

export const sidebarWidthSelector = state => state.sidebarWidth || initialState.sidebarWidth
export const defaultSidebarWidthSelector = state => state.defaultSidebarWidth || initialState.defaultSidebarWidth
export const isSidebarOpen = state =>
  (state.sidebarWidth || initialState.sidebarWidth) === initialState.defaultSidebarWidth
export const languageSelector = state => state.displayLanguage || initialState.displayLanguage
