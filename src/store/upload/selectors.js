export const initialState = {
  products: []
}

export const analyticsSelector = state => state.products || initialState.products
export const getTableName = state => (state.index ? state.index.tableName : localStorage.getItem('indexTableName'))
