import { connect } from 'react-redux'
import { getProductsGdti, indexFieldsProductsGetIndexInfo } from 'store/actions'
import ProductEditComponentsWidget from './ProductEditComponentsWidget'

const mapStateToProps = state => ({
  gdti: state.products.gdti,
  isLoadingProductsGdti: state.products.isLoadingProductsGdti
})

export default connect(mapStateToProps, { getProductsGdti, indexFieldsProductsGetIndexInfo })(
  ProductEditComponentsWidget
)
