export const initialState = {
  customerIsLoading: false,
  customerList: null,
  customerCount: 0,
  customerInfo: null,
  customerInfoIsLoading: false,
  isSuccessRemoving: false,
  isUpdating: false,
  isUpdatingConstraints: false,
  isLoadingConstraints: false,
  constraints: null,
  isUpdatingBrands: false,
  isLoadingBrands: false,
  brands: null,
  isUpdatingPortfolios: false,
  isLoadingPortfolios: false,
  portfolios: null,
  activePortfolio: null,
  isLoadingPortfolio: false,
  filters: {
    offset: 0,
    limit: 10
  }
}

export const filtersSelector = state => state.customer.filters || initialState.filters
