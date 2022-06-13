import { connect } from 'react-redux'
import { postUpload } from 'store/actions'
import BrandForm from './BrandForm'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  activeIndex: state.upload.activeIndex
})

export default connect(mapStateToProps, { postUpload })(BrandForm)
