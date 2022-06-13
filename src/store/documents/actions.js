export const GET_DOCUMENTS = 'documents/GET_DOCUMENTS'
export const GET_DOCUMENTS_SUCCESS = 'documents/GET_DOCUMENTS_SUCCESS'
export const GET_DOCUMENTS_FAIL = 'documents/GET_DOCUMENTS_FAIL'

export const DELETE_DOCUMENT = 'documents/DELETE_DOCUMENT'
export const DELETE_DOCUMENT_SUCCESS = 'documents/DELETE_DOCUMENT_SUCCESS'
export const DELETE_DOCUMENT_FAIL = 'documents/DELETE_DOCUMENT_FAIL'

export const documentsGetDocuments = payload => ({
  type: GET_DOCUMENTS,
  payload
})

export const documentsGetDocumentsSuccess = payload => ({
  type: GET_DOCUMENTS_SUCCESS,
  payload
})

export const documentsGetDocumentsFail = payload => ({
  type: GET_DOCUMENTS_FAIL,
  payload
})
