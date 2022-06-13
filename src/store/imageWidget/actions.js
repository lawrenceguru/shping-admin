export const GET_IMAGE_LABELS = 'image/GET_LABELS'
export const GET_IMAGE_LABELS_SUCCESS = 'image/GET_LABELS_SUCCESS'
export const GET_IMAGE_FAILED = 'image/GET_LABELS_FAILED'

export const GET_IMAGE_OBJECTS = 'image/GET_OBJECTS'
export const GET_IMAGE_OBJECTS_SUCCESS = 'image/GET_OBJECTS_SUCCESS'

export const PUT_IMAGE_LABELS = 'image/PUT_IMAGE'

export const PUT_UPDATED_IMAGE_LABELS = 'image/PUT_UPDATED_IMAGE_LABELS'

export const DELETE_IMAGE_LABELS = 'image/DELETE_IMAGE'

export const POST_IMAGE_LABELS = 'image/POST_OBJECTS'
export const POST_IMAGE_LABELS_SUCCESS = 'image/POST_OBJECTS_SUCCESS'

export const requestImageLabels = payload => ({
  type: GET_IMAGE_LABELS,
  payload
})

export const requestImageLabelsSuccess = payload => ({
  type: GET_IMAGE_LABELS_SUCCESS,
  payload
})

export const imageLabelsFailed = error => ({
  type: GET_IMAGE_FAILED,
  payload: {
    error
  }
})

export const imageObjectsSuccess = payload => ({
  type: GET_IMAGE_OBJECTS_SUCCESS,
  payload
})

export const addImageLabels = payload => ({
  type: PUT_IMAGE_LABELS,
  payload
})

export const updateImageLabeling = payload => ({
  type: PUT_UPDATED_IMAGE_LABELS,
  payload
})

export const removeImageLabels = payload => ({
  type: DELETE_IMAGE_LABELS,
  payload
})

export const saveImageLabels = payload => ({
  type: POST_IMAGE_LABELS,
  payload
})

export const saveImageLabelsSuccess = payload => ({
  type: POST_IMAGE_LABELS_SUCCESS,
  payload
})
