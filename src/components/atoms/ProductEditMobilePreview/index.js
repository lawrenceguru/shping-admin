import { connect } from 'react-redux'
import { getGtin, getGdtiNutritions, getProductsGdti } from 'store/actions'
import ProductEditMobilePreview from './ProductEditMobilePreview'

const mapStateToProps = state => ({
  gtinInfo: state.gtin.data,
  gdti: state.products.gdti,
  nutritions: state.gdti.nutritions
})

export default connect(mapStateToProps, { getGtin, getGdtiNutritions, getProductsGdti })(ProductEditMobilePreview)
