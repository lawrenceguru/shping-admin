import {
  POST_GET_DOCS,
  POST_GET_DOCS_SUCCESS,
  POST_GET_DOCS_FAIL,
  UPDATE_REVIEW_IMAGES,
  UPDATE_REVIEW_IMAGES_SUCCESS,
  UPDATE_REVIEW_IMAGES_FAIL,
  PUT_REVIEW_TAG,
  PUT_REVIEW_TAG_SUCCESS,
  PUT_REVIEW_TAG_FAIL,
  PUT_REVIEW_ACCEPT_REPORT,
  PUT_REVIEW_ACCEPT_REPORT_SUCCESS,
  PUT_REVIEW_ACCEPT_REPORT_FAIL,
  PUT_REVIEW_REJECT_REPORT,
  PUT_REVIEW_REJECT_REPORT_SUCCESS,
  PUT_REVIEW_REJECT_REPORT_FAIL,
  PUT_LOC_REVIEW,
  PUT_LOC_REVIEW_SUCCESS,
  PUT_LOC_REVIEW_FAIL,
  PUT_REVIEW_DOC,
  PUT_REVIEW_DOC_SUCCESS,
  PUT_REVIEW_DOC_FAIL,
  SET_FILTERS,
  REVIEW_STATUS_ALL_BATCH_TASKS,
  REVIEW_STATUS_ALL_BATCH_TASKS_SUCCESS,
  REVIEW_STATUS_ALL_BATCH_TASKS_FAIL,
  POST_REVIEW_LIST,
  POST_REVIEW_LIST_SUCCESS,
  POST_REVIEW_LIST_FAIL,
  PUT_REVIEW_CHANGE_STATUS,
  PUT_REVIEW_REMOVE_ITEM,
  CLEAR_UPDATED_ID,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
} from './actions'

import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_GET_DOCS:
      return {
        ...state,
        isReviewsLoading: true,
        updatedId: null
      }
    case POST_GET_DOCS_SUCCESS:
      return {
        ...state,
        isReviewsLoading: false,
        reviews: payload.documents,
        reviewsCount: payload.count,
        updatedId: payload.id
      }
    case POST_GET_DOCS_FAIL:
      return {
        ...state,
        isReviewsLoading: false,
        updatedId: null
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: payload
      }
    case UPDATE_REVIEW_IMAGES:
      return {
        ...state,
        isUpdateImagesReview: true
      }
    case UPDATE_REVIEW_IMAGES_SUCCESS:
      return {
        ...state,
        isUpdateImagesReview: false
      }
    case UPDATE_REVIEW_IMAGES_FAIL:
      return {
        ...state,
        isUpdateImagesReview: false
      }
    case PUT_REVIEW_TAG:
      return {
        ...state,
        isTagUpdated: true
      }
    case PUT_REVIEW_TAG_SUCCESS:
      return {
        ...state,
        isTagUpdated: false
      }
    case PUT_REVIEW_TAG_FAIL:
      return {
        ...state,
        isTagUpdated: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        isCommentUpdated: true
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentUpdated: false
      }
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        isCommentUpdated: false
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        isCommentUpdated: true
      }
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentUpdated: false
      }
    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        isCommentUpdated: false
      }
    case DELETE_COMMENT:
      return {
        ...state,
        isCommentUpdated: true
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentUpdated: false
      }
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        isCommentUpdated: false
      }
    case PUT_REVIEW_ACCEPT_REPORT:
      return {
        ...state,
        updatingReview: payload
      }
    case PUT_REVIEW_ACCEPT_REPORT_SUCCESS:
      return {
        ...state,
        updatingReview: null
      }
    case PUT_REVIEW_ACCEPT_REPORT_FAIL:
      return {
        ...state,
        updatingReview: null
      }
    case PUT_REVIEW_REJECT_REPORT:
      return {
        ...state,
        updatingReview: payload
      }
    case PUT_REVIEW_REJECT_REPORT_SUCCESS:
      return {
        ...state,
        updatingReview: null
      }
    case PUT_REVIEW_REJECT_REPORT_FAIL:
      return {
        ...state,
        updatingReview: null
      }
    case PUT_LOC_REVIEW:
      return {
        ...state
      }
    case PUT_LOC_REVIEW_SUCCESS:
      return {
        ...state
      }
    case PUT_LOC_REVIEW_FAIL:
      return {
        ...state
      }
    case PUT_REVIEW_DOC:
      return {
        ...state,
        updatingReview: payload.id
      }
    case PUT_REVIEW_DOC_SUCCESS:
      return {
        ...state,
        updatingReview: null
      }
    case PUT_REVIEW_DOC_FAIL:
      return {
        ...state,
        updatingReview: null
      }
    case REVIEW_STATUS_ALL_BATCH_TASKS:
      return {
        ...state,
        isLoadingAllBatchTasks: true
      }
    case REVIEW_STATUS_ALL_BATCH_TASKS_SUCCESS:
      return {
        ...state,
        allBatchTasks: payload,
        isLoadingAllBatchTasks: false
      }
    case REVIEW_STATUS_ALL_BATCH_TASKS_FAIL:
      return {
        ...state,
        isLoadingAllBatchTasks: false
      }
    case POST_REVIEW_LIST:
      return {
        ...state,
        loadedReviews: (payload && payload.values && Object.keys(payload.values)) || []
      }
    case POST_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        loadedReviews: []
      }
    case POST_REVIEW_LIST_FAIL:
      return {
        ...state,
        loadedReviews: []
      }
    case CLEAR_UPDATED_ID:
      return {
        ...state,
        updatedId: null
      }
    case PUT_REVIEW_CHANGE_STATUS:
      return {
        ...state,
        reviews:
          state.reviews && state.reviews.length
            ? state.reviews.map(item => ({
                ...item,
                status: item.id === payload.id ? payload.status : item.status
              }))
            : []
      }
    case PUT_REVIEW_REMOVE_ITEM:
      return {
        ...state,
        reviews: state.reviews && state.reviews.length ? state.reviews.filter(item => item.id !== payload) : []
      }
    default:
      return state
  }
}
