export const initialState = {
  isStatissticLoad: false,
  statistic: null,
  createdTotal: 0,
  intoCirculationTotal: 0,
  shippedTotal: 0
}

export const filters = state => state.serializationAnalyticsFilters
