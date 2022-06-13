export const GET_CAPTURE_LINK = 'capture_link/GET'
export const GET_CAPTURE_LINK_FAILED = 'capture_link/GET_FAILED'
export const GET_CAPTURE_LINK_SUCCESS = 'capture_link/GET_SUCCESS'

export const POST_CAPTURE_LINK = 'capture_link/POST'
export const POST_CAPTURE_LINK_FAILED = 'capture_link/GET_FAILED'
export const POST_CAPTURE_LINK_SUCCESS = 'capture_link/GET_SUCCESS'

export const DELETE_CAPTURE_LINK = 'capture_link/DELETE'
export const DELETE_CAPTURE_LINK_FAILED = 'capture_link/DELETE_FAILED'

export const getCodeLink = payload => ({
  type: GET_CAPTURE_LINK,
  payload
})

export const createCodeLink = payload => ({
  type: POST_CAPTURE_LINK,
  payload
})

export const getCaptureLinkSuccess = payload => ({
  type: GET_CAPTURE_LINK_SUCCESS,
  payload
})

export const getCaptureLinkFailed = error => ({
  type: GET_CAPTURE_LINK_FAILED,
  payload: {
    error
  }
})

export const postCaptureLinkFailed = error => ({
  type: POST_CAPTURE_LINK_FAILED,
  payload: {
    error
  }
})

export const postCaptureLinkSuccess = payload => ({
  type: POST_CAPTURE_LINK_SUCCESS,
  payload
})

export const removeCodeLink = payload => ({
  type: DELETE_CAPTURE_LINK,
  payload
})

export const removeCodeLinkFailed = error => ({
  type: DELETE_CAPTURE_LINK_FAILED,
  payload: {
    error
  }
})
