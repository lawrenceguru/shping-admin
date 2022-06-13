import { connect } from 'react-redux'
import { postUpload, postUploadClear, getGdtiCertificates } from 'store/actions'
import ProductEditCertificatesWidget from './ProductEditCertificatesWidget'

const mapStateToProps = state => ({
  certificates: state.gdti.certificates,
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  activeIndex: state.upload.activeIndex
})

export default connect(mapStateToProps, { postUpload, postUploadClear, getGdtiCertificates })(
  ProductEditCertificatesWidget
)
