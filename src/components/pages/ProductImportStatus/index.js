import { connect } from 'react-redux'
import { productsGetImportStatus, productsGetImportStatuses } from 'store/actions'
import ProductImportStatus from './ProductImportStatus'

const mapStateToProps = state => ({
  importStatus: state.productImport.importStatus,
  isImportLoading: state.productImport.isImportLoading
})
export default connect(mapStateToProps, { productsGetImportStatus, productsGetImportStatuses })(ProductImportStatus)
