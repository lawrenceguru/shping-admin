export const initialState = {
  products: [],
  order: null
}

export const analyticsSelector = state => state.products || initialState.products
export const getTableName = state => (state.index && state.index.tableName) || localStorage.getItem('indexTableName')
export const getSlgtinTableName = state =>
  (state.indexFieldsSerialization && state.indexFieldsSerialization.tableName) ||
  localStorage.getItem('indexTableSlgtinName')
