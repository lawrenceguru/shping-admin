/* eslint-disable no-unused-vars */
import { POST_UPLOAD, POST_UPLOAD_SUCCESS, POST_UPLOAD_FAIL, POST_UPLOAD_CLEAR } from './actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case POST_UPLOAD:
      return {
        ...state,
        activeIndex: payload.index,
        isUploading: payload.id,
        isUploadingVideo: payload.isVideo || (payload.type && payload.type.includes('video'))
      }
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        lastUploaded: {
          url: payload.data,
          index: payload.index,
          id: payload.id,
          isVideo: payload.isVideo,
          type: payload.type
        },
        isUploadingVideo: false,
        isUploading: null
      }
    case POST_UPLOAD_FAIL:
      return {
        ...state,
        isUploadingVideo: false,
        isUploading: false,
        activeIndex: null
      }
    case POST_UPLOAD_CLEAR:
      return {
        ...state,
        activeIndex: null,
        lastUploaded: { url: null, index: null, id: null, isVideo: false },
        isUploading: null
      }
    default:
      return state
  }
}
