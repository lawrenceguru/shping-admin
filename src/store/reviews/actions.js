export const POST_GET_DOCS = 'reviews/POST_GET_DOCS'
export const POST_GET_DOCS_SUCCESS = 'reviews/POST_GET_DOCS_SUCCESS'
export const POST_GET_DOCS_FAIL = 'reviews/POST_GET_DOCS_FAIL'

export const UPDATE_REVIEW_IMAGES = 'reviews/UPDATE_REVIEW_IMAGES'
export const UPDATE_REVIEW_IMAGES_SUCCESS = 'reviews/UPDATE_REVIEW_IMAGES_SUCCESS'
export const UPDATE_REVIEW_IMAGES_FAIL = 'reviews/UPDATE_REVIEW_IMAGES_FAIL'

export const PUT_REVIEW_TAG = 'reviews/PUT_REVIEW_TAG'
export const PUT_REVIEW_TAG_SUCCESS = 'reviews/PUT_REVIEW_TAG_SUCCESS'
export const PUT_REVIEW_TAG_FAIL = 'reviews/PUT_REVIEW_TAG_FAIL'

export const PUT_REVIEW_REJECT_REPORT = 'reviews/PUT_REVIEW_REJECT_REPORT'
export const PUT_REVIEW_REJECT_REPORT_SUCCESS = 'reviews/PUT_REVIEW_REJECT_REPORT_SUCCESS'
export const PUT_REVIEW_REJECT_REPORT_FAIL = 'reviews/PUT_REVIEW_REJECT_REPORT_FAIL'

export const PUT_REVIEW_ACCEPT_REPORT = 'reviews/PUT_REVIEW_ACCEPT_REPORT'
export const PUT_REVIEW_ACCEPT_REPORT_SUCCESS = 'reviews/PUT_REVIEW_ACCEPT_REPORT_SUCCESS'
export const PUT_REVIEW_ACCEPT_REPORT_FAIL = 'reviews/PUT_REVIEW_ACCEPT_REPORT_FAIL'

export const PUT_LOC_REVIEW = 'reviews/PUT_LOC_REVIEW'
export const PUT_LOC_REVIEW_SUCCESS = 'reviews/PUT_LOC_REVIEW_SUCCESS'
export const PUT_LOC_REVIEW_FAIL = 'reviews/PUT_LOC_REVIEW_FAIL'

export const PUT_REVIEW_DOC = 'reviews/PUT_REVIEW_DOC'
export const PUT_REVIEW_DOC_SUCCESS = 'reviews/PUT_REVIEW_DOC_SUCCESS'
export const PUT_REVIEW_DOC_FAIL = 'reviews/PUT_REVIEW_DOC_FAIL'

export const SET_FILTERS = 'reviews/SET_FILTERS'

export const REVIEW_STATUS_ALL_BATCH_TASKS = 'reviews/REVIEW_STATUS_ALL_BATCH_TASKS'
export const REVIEW_STATUS_ALL_BATCH_TASKS_SUCCESS = 'reviews/REVIEW_STATUS_ALL_BATCH_TASKS_SUCCESS'
export const REVIEW_STATUS_ALL_BATCH_TASKS_FAIL = 'reviews/REVIEW_STATUS_ALL_BATCH_TASKS_FAIL'

export const POST_REVIEW_LIST = 'reviews/POST_REVIEW_LIST'
export const POST_REVIEW_LIST_SUCCESS = 'reviews/POST_REVIEW_LIST_SUCCESS'
export const POST_REVIEW_LIST_FAIL = 'reviews/POST_REVIEW_LIST_FAIL'

export const PUT_REVIEW_REMOVE_ITEM = 'reviews/PUT_REVIEW_REMOVE_ITEM'
export const PUT_REVIEW_CHANGE_STATUS = 'reviews/PUT_REVIEW_CHANGE_STATUS'

export const CLEAR_UPDATED_ID = 'reviews/CLEAR_UPDATED_ID'

export const ADD_COMMENT = 'reviews/ADD_COMMENT'
export const ADD_COMMENT_SUCCESS = 'reviews/ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAIL = 'reviews/ADD_COMMENT_FAIL'

export const UPDATE_COMMENT = 'reviews/UPDATE_COMMENT'
export const UPDATE_COMMENT_SUCCESS = 'reviews/UPDATE_COMMENT_SUCCESS'
export const UPDATE_COMMENT_FAIL = 'reviews/UPDATE_COMMENT_FAIL'

export const DELETE_COMMENT = 'reviews/DELETE_COMMENT'
export const DELETE_COMMENT_SUCCESS = 'reviews/DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAIL = 'reviews/DELETE_COMMENT_FAIL'

export const reviewsPostGetDocs = payload => ({
  type: POST_GET_DOCS,
  payload
})

export const reviewsPostGetDocsSuccess = payload => ({
  type: POST_GET_DOCS_SUCCESS,
  payload
})

export const reviewsPostGetDocsFail = payload => ({
  type: POST_GET_DOCS_FAIL,
  payload
})

export const reviewsSetFilters = payload => ({
  type: SET_FILTERS,
  payload
})

export const reviewsUpdateReviewImages = payload => ({
  type: UPDATE_REVIEW_IMAGES,
  payload
})

export const reviewsUpdateReviewImagesSuccess = payload => ({
  type: UPDATE_REVIEW_IMAGES_SUCCESS,
  payload
})

export const reviewsUpdateReviewImagesFail = payload => ({
  type: UPDATE_REVIEW_IMAGES_FAIL,
  payload
})

export const reviewPutReviewTag = payload => ({
  type: PUT_REVIEW_TAG,
  payload
})

export const reviewPutReviewTagSuccess = payload => ({
  type: PUT_REVIEW_TAG_SUCCESS,
  payload
})

export const reviewPutReviewTagFail = payload => ({
  type: PUT_REVIEW_TAG_FAIL,
  payload
})

export const reviewsPutReviewRejectReport = payload => ({
  type: PUT_REVIEW_REJECT_REPORT,
  payload
})

export const reviewsPutReviewRejectReportSuccess = payload => ({
  type: PUT_REVIEW_REJECT_REPORT_SUCCESS,
  payload
})

export const reviewsPutReviewRejectReportFail = payload => ({
  type: PUT_REVIEW_REJECT_REPORT_FAIL,
  payload
})

export const reviewsPutReviewAcceptReport = payload => ({
  type: PUT_REVIEW_ACCEPT_REPORT,
  payload
})

export const reviewsPutReviewAcceptReportSuccess = payload => ({
  type: PUT_REVIEW_ACCEPT_REPORT_SUCCESS,
  payload
})

export const reviewsPutReviewAcceptReportFail = payload => ({
  type: PUT_REVIEW_ACCEPT_REPORT_FAIL,
  payload
})

export const reviewsPutLocReview = payload => ({
  type: PUT_LOC_REVIEW,
  payload
})

export const reviewsPutLocReviewSuccess = payload => ({
  type: PUT_LOC_REVIEW_SUCCESS,
  payload
})

export const reviewsPutLocReviewFail = payload => ({
  type: PUT_LOC_REVIEW_FAIL,
  payload
})

export const reviewsPutReviewDoc = payload => ({
  type: PUT_REVIEW_DOC,
  payload
})

export const reviewsPutReviewDocSuccess = payload => ({
  type: PUT_REVIEW_DOC_SUCCESS,
  payload
})

export const reviewsPutReviewDocFail = payload => ({
  type: PUT_REVIEW_DOC_FAIL,
  payload
})

export const reviewStatusAllBatchTask = payload => ({
  type: REVIEW_STATUS_ALL_BATCH_TASKS,
  payload
})

export const reviewStatusAllBatchTaskSuccess = payload => ({
  type: REVIEW_STATUS_ALL_BATCH_TASKS_SUCCESS,
  payload
})

export const reviewStatusAllBatchTaskFail = payload => ({
  type: REVIEW_STATUS_ALL_BATCH_TASKS_FAIL,
  payload
})

export const reviewsPostReviewList = payload => ({
  type: POST_REVIEW_LIST,
  payload
})

export const reviewsPostReviewListSuccess = payload => ({
  type: POST_REVIEW_LIST_SUCCESS,
  payload
})

export const reviewsPostReviewListFail = payload => ({
  type: POST_REVIEW_LIST_FAIL,
  payload
})

export const reviewsClearUpdatedId = payload => ({
  type: CLEAR_UPDATED_ID,
  payload
})

export const reviewsPutRemoveReviewItem = payload => ({
  type: PUT_REVIEW_REMOVE_ITEM,
  payload
})

export const reviewsPutReviewChangeStatus = payload => ({
  type: PUT_REVIEW_CHANGE_STATUS,
  payload
})

export const reviewsAddComment = payload => ({
  type: ADD_COMMENT,
  payload
})

export const reviewsAddCommentSuccess = payload => ({
  type: ADD_COMMENT_SUCCESS,
  payload
})

export const reviewsAddCommentFail = payload => ({
  type: ADD_COMMENT_FAIL,
  payload
})

export const reviewsUpdateComment = payload => ({
  type: UPDATE_COMMENT,
  payload
})

export const reviewsUpdateCommentSuccess = payload => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload
})

export const reviewsUpdateCommentFail = payload => ({
  type: UPDATE_COMMENT_FAIL,
  payload
})

export const reviewsDeleteComment = payload => ({
  type: DELETE_COMMENT,
  payload
})

export const reviewsDeleteCommentSuccess = payload => ({
  type: DELETE_COMMENT_SUCCESS,
  payload
})

export const reviewsDeleteCommentFail = payload => ({
  type: DELETE_COMMENT_FAIL,
  payload
})
