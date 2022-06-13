import { connect } from 'react-redux'
import { settingsGetDocumentsType, postUploadClear } from 'store/actions'
import DocumentEditInfoWidget from './DocumentEditInfoWidget'

const mapStateToProps = state => ({
  isLoadingType: state.settings.isLoadingType,
  documentType: state.settings.documentType
})

export default connect(mapStateToProps, { settingsGetDocumentsType, postUploadClear })(DocumentEditInfoWidget)
