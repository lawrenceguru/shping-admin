import { connect } from 'react-redux'
import { postUpload, postUploadClear } from 'store/actions'
import ProductEditVideoWidget from './ProductEditVideoWidget'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  isUploadingVideo: state.upload.isUploadingVideo,
  activeIndex: state.upload.activeIndex
})

export default connect(mapStateToProps, { postUpload, postUploadClear })(ProductEditVideoWidget)
