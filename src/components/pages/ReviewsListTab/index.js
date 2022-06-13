import { connect } from 'react-redux'
import {
  reviewsPostGetDocs,
  reviewsUpdateReviewImages,
  reviewsSetFilters,
  settingsGetCountries,
  settingsGetLanguages,
  reviewStatusAllBatchTask,
  reviewsPostReviewList
} from 'store/actions'
import ReviewsListTab from './ReviewsListTab'

const mapStateToProps = state => ({
  isReviewsLoading: state.reviews.isReviewsLoading,
  reviews: state.reviews.reviews,
  reviewsCount: state.reviews.reviewsCount,
  isUpdateImagesReview: state.reviews.isUpdateImagesReview,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  allBatchTasks: state.reviews.allBatchTasks,
  isLoadingAllBatchTasks: state.reviews.isLoadingAllBatchTasks,
  media: state &&
    state.upload &&
    state.upload.lastUploaded && {
      url: state.upload.lastUploaded.url,
      id: state && state.upload.lastUploaded.id,
      widgetIndex: state && state.upload.activeIndex
    }
})

export default connect(mapStateToProps, {
  reviewsPostGetDocs,
  reviewsUpdateReviewImages,
  settingsGetCountries,
  settingsGetLanguages,
  reviewsSetFilters,
  reviewStatusAllBatchTask,
  reviewsPostReviewList
})(ReviewsListTab)
