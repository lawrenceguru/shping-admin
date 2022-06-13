export const POST_UPLOAD_CLEAR = 'upload/SET_POST_UPLOAD_CLEAR'
export const POST_UPLOAD = 'upload/POST_UPLOAD'
export const POST_UPLOAD_SUCCESS = 'upload/POST_UPLOAD_SUCCESS'
export const POST_UPLOAD_FAIL = 'upload/POST_UPLOAD_FAIL'

export const postUpload = payload => ({
  type: POST_UPLOAD,
  payload
})

export const postUploadSuccess = payload => ({
  type: POST_UPLOAD_SUCCESS,
  payload
})

export const postUploadFail = error => ({
  type: POST_UPLOAD_FAIL,
  payload: {
    error
  }
})

export const postUploadClear = payload => ({
  type: POST_UPLOAD_CLEAR,
  payload
})
