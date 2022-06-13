import { connect } from 'react-redux'
import { getProductsGdti, indexFieldsProductsGetIndexInfo, getGdtiNutritions } from 'store/actions'
import ProductEditNutritionInfoWidget from './ProductEditNutritionInfoWidget'

const mapStateToProps = state => ({
  gdti: state.products.gdti,
  isLoadingProductsGdti: state.products.isLoadingProductsGdti,
  nutritions: state.gdti.nutritions,
  isLoadingGdtiNutritions: state.gdti.isLoadingGdtiNutritions
})

export default connect(mapStateToProps, { getProductsGdti, indexFieldsProductsGetIndexInfo, getGdtiNutritions })(
  ProductEditNutritionInfoWidget
)
