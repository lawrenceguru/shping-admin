import { connect } from 'react-redux'
import { getProductsList, deleteGtin, indexFieldsProductsGetIndexInfo } from 'store/actions'
import ProductCatalogueTab from './ProductCatalogueTab'

const mapStateToProps = state => ({
  products: state.products.products,
  count: state.products.count,
  customIndexFields: state.indexFieldsProducts.customIndexFields,
  defaultIndexFields: state.indexFieldsProducts.defaultIndexFields,
  brands: state.indexFieldsProducts.brands,
  isDeletingGtin: state.gtin.isDeletingGtin,
  isLoadingProductsList: state.products.isLoadingProductsList,
  currentParticipant: state.identity.current_participant
})

export default connect(mapStateToProps, { getProductsList, deleteGtin, indexFieldsProductsGetIndexInfo })(
  ProductCatalogueTab
)
