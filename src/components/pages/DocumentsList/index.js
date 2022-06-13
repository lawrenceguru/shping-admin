import { connect } from 'react-redux'
import { documentsGetDocuments, deleteGdti, indexFieldsDocumentsGetIndexInfo } from 'store/actions'
import DocumentsPage from './DocumentsList'

const mapStateToProps = state => ({
  documents: state.documents.documents,
  isLoading: state.documents.isLoading,
  count: state.documents.count,
  isDeleting: state.gdti.isDeleting,
  documentType: state.documents.documentType,
  participants: state.identity.participants,
  customIndexFields: state.indexFieldsDocuments.customIndexFields,
  deletedId: state.gdti.deletedId
})

export default connect(mapStateToProps, {
  documentsGetDocuments,
  deleteGdti,
  indexFieldsDocumentsGetIndexInfo
})(DocumentsPage)
