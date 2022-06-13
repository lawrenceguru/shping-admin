import { connect } from 'react-redux'
import { indexFieldsProductsGetIndexInfo, indexFieldsProductsPostIndexInfo } from 'store/actions'
import IndexFieldsProducts from './IndexFieldsProducts'

const mapStateToProps = state => ({
  customIndexFields: state.indexFieldsProducts.customIndexFields,
  prevIndexFields: state.indexFieldsProducts.prevIndexFields,
  defaultIndexFields: state.indexFieldsProducts.defaultIndexFields,
  isLoadingIndexInfo: state.indexFieldsProducts.isLoadingIndexInfo
})

export default connect(mapStateToProps, { indexFieldsProductsGetIndexInfo, indexFieldsProductsPostIndexInfo })(
  IndexFieldsProducts
)
