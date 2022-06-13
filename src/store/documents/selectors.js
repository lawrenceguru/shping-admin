export const initialState = {
  isLoading: false,
  deleteId: null,
  isSave: null,
  editId: null,
  all: null,
  count: null
}

export const getTableName = state =>
  (state.indexFieldsDocuments && state.indexFieldsDocuments.tableName) || localStorage.getItem('indexTableGdtiName')

export const getParticipants = state => (state.identity && state.identity.participants) || []
