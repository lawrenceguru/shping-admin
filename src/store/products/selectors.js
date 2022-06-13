export const initialState = {
  products: [],
  completeListIsLoading: false,
  completeList: [],
  completeGdtiList: [],
  completeListGdtiIsLoading: false
}

export const analyticsSelector = state => state.products || initialState.products
export const getTableName = state => (state.index && state.index.tableName) || localStorage.getItem('indexTableName')
export const getGdtiTableName = state =>
  (state.index && state.index.tableGdtiName) || localStorage.getItem('indexTableGdtiName')
