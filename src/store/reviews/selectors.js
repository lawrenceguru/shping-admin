export const initialState = {
  isReviewsLoading: false,
  reviews: null,
  reviewsCount: 0,
  isUpdateImagesReview: false,
  isTagUpdated: false,
  updatingReview: null,
  filters: { statuses: ['open', 'report'] },
  allBatchTasks: null,
  isLoadingAllBatchTasks: false,
  loadedReviews: [],
  updatedId: null,
  isCommentUpdated: false
}

export const getFilters = state => state.filters || {}
