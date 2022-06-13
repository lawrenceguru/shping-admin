import { connect } from 'react-redux'
import { postUpload, postUploadClear } from 'store/actions'
import UploadImg from './UplodaImg'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  activeIndex: state.upload.activeIndex
})

export default connect(mapStateToProps, { postUpload, postUploadClear })(UploadImg)
