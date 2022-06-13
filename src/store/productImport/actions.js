export const POST_IMPORT_START = 'products/POST_IMPORT_START'
export const POST_IMPORT_START_SUCCESS = 'products/POST_IMPORT_START_SUCCESS'
export const POST_IMPORT_START_FAIL = 'products/POST_IMPORT_START_FAIL'

export const GET_IMPORT_STATUS = 'products/GET_IMPORT_STATUS'
export const GET_IMPORT_STATUS_SUCCESS = 'products/GET_IMPORT_STATUS_SUCCESS'
export const GET_IMPORT_STATUS_FAIL = 'products/GET_IMPORT_STATUS_FAIL'

export const GET_IMPORT_STATUSES = 'products/GET_IMPORT_STATUSES'
export const GET_IMPORT_STATUSES_SUCCESS = 'products/GET_IMPORT_STATUSES_SUCCESS'
export const GET_IMPORT_STATUSES_FAIL = 'products/GET_IMPORT_STATUSES_FAIL'

export const POST_PREVIEW = 'products/POST_PREVIEW'
export const POST_PREVIEW_SUCCESS = 'products/POST_PREVIEW_SUCCESS'
export const POST_PREVIEW_FAIL = 'products/POST_PREVIEW_FAIL'

export const PUT_COLUMN = 'products/PUT_COLUMN'
export const POST_FILE = 'products/POST_FILE'
export const CLEAR_PREVIEW = 'products/CLEAR_PREVIEW'
export const PUT_ROWS = 'products/PUT_ROWS'

export const productsPostImportStart = payload => ({
  type: POST_IMPORT_START,
  payload
})

export const productsPostImportStartSuccess = payload => ({
  type: POST_IMPORT_START_SUCCESS,
  payload
})

export const productsPostImportStartFail = payload => ({
  type: POST_IMPORT_START_FAIL,
  payload
})

export const productsGetImportStatus = payload => ({
  type: GET_IMPORT_STATUS,
  payload
})

export const productsGetImportStatusSuccess = payload => ({
  type: GET_IMPORT_STATUS_SUCCESS,
  payload
})

export const productsGetImportStatusFail = payload => ({
  type: GET_IMPORT_STATUS_FAIL,
  payload
})

export const productsGetImportStatuses = payload => ({
  type: GET_IMPORT_STATUSES,
  payload
})

export const productsGetImportStatusesSuccess = payload => ({
  type: GET_IMPORT_STATUSES_SUCCESS,
  payload
})

export const productsGetImportStatusesFail = payload => ({
  type: GET_IMPORT_STATUSES_FAIL,
  payload
})

export const productsPostPreview = payload => ({
  type: POST_PREVIEW,
  payload
})

export const productsPostPreviewSuccess = payload => ({
  type: POST_PREVIEW_SUCCESS,
  payload
})

export const productsPostPreviewFail = payload => ({
  type: POST_PREVIEW_FAIL,
  payload
})

export const productsPutColumn = payload => ({
  type: PUT_COLUMN,
  payload
})

export const productsPostFile = payload => ({
  type: POST_FILE,
  payload
})

export const productsClearPreview = () => ({
  type: CLEAR_PREVIEW
})

export const productsPutRows = payload => ({
  type: PUT_ROWS,
  payload
})
