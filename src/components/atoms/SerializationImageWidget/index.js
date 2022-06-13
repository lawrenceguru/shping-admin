import { connect } from 'react-redux'
import {
  postUpload,
  postUploadClear,
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
} from 'store/actions'
import ProductEditImageWidget from './SerializationImagesWidget'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  activeIndex: state.upload.activeIndex,
  lists: state.imageWidget.list,
  details: state.imageWidget.details
})

export default connect(mapStateToProps, {
  postUpload,
  postUploadClear,
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
})(ProductEditImageWidget)
