import { connect } from 'react-redux'
import { indexFieldsDocumentsGetIndexInfo, indexFieldsDocumentsPostIndexInfo } from 'store/actions'
import IndexFieldsDocuments from './IndexFieldsDocuments'

const mapStateToProps = state => ({
  customIndexFields: state.indexFieldsDocuments.customIndexFields,
  prevIndexFields: state.indexFieldsDocuments.prevIndexFields,
  defaultIndexFields: state.indexFieldsDocuments.defaultIndexFields,
  isLoadingIndexInfo: state.indexFieldsDocuments.isLoadingIndexInfo
})

export default connect(mapStateToProps, { indexFieldsDocumentsGetIndexInfo, indexFieldsDocumentsPostIndexInfo })(
  IndexFieldsDocuments
)
