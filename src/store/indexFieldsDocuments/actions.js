export const GET_INDEX_INFO = 'indexFieldsDocuments/GET_INDEX_INFO'
export const GET_INDEX_INFO_SUCCESS = 'indexFieldsDocuments/GET_INDEX_INFO_SUCCESS'
export const GET_INDEX_INFO_FAIL = 'indexFieldsDocuments/GET_INDEX_INFO_FAIL'

export const POST_INDEX_INFO = 'indexFieldsDocuments/POST_INDEX_INFO'
export const POST_INDEX_INFO_SUCCESS = 'indexFieldsDocuments/POST_INDEX_INFO_SUCCESS'
export const POST_INDEX_INFO_FAIL = 'indexFieldsDocuments/POST_INDEX_INFO_FAIL'

export const indexFieldsDocumentsGetIndexInfo = () => ({
  type: GET_INDEX_INFO
})

export const indexFieldsDocumentsGetIndexInfoSuccess = payload => ({
  type: GET_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsDocumentsGetIndexInfoFail = error => ({
  type: GET_INDEX_INFO_FAIL,
  payload: {
    error
  }
})

export const indexFieldsDocumentsPostIndexInfo = payload => ({
  type: POST_INDEX_INFO,
  payload
})

export const indexFieldsDocumentsPostIndexInfoSuccess = payload => ({
  type: POST_INDEX_INFO_SUCCESS,
  payload
})

export const indexFieldsDocumentsPostIndexInfoFail = error => ({
  type: POST_INDEX_INFO_FAIL,
  payload: {
    error
  }
})
