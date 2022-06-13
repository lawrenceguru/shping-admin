import { connect } from 'react-redux'
import {
  postUpload,
  reviewPutReviewTag,
  reviewsPutReviewAcceptReport,
  reviewsPutReviewRejectReport,
  reviewsPutReviewDoc,
  reviewsClearUpdatedId,
  reviewsAddComment,
  reviewsUpdateComment,
  reviewsDeleteComment
} from 'store/actions'
import ReviewCard from './ReviewCard'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  activeIndex: state.upload.activeIndex,
  isTagUpdated: state.reviews.isTagUpdated,
  updatingReview: state.reviews.updatingReview,
  loadedReviews: state.reviews.loadedReviews,
  updatedId: state.reviews.updatedId,
  isCommentUpdated: state.reviews.isCommentUpdated
})

export default connect(mapStateToProps, {
  postUpload,
  reviewPutReviewTag,
  reviewsPutReviewAcceptReport,
  reviewsPutReviewRejectReport,
  reviewsPutReviewDoc,
  reviewsClearUpdatedId,
  reviewsAddComment,
  reviewsUpdateComment,
  reviewsDeleteComment
})(ReviewCard)
