import { connect } from 'react-redux'
import { getProductsList } from '../../../store/actions'
import ProductsTableField from './ProductsTableField'

const mapStateToProps = state => ({
  products: state.products.products,
  count: state.products.count,
  isLoadingProductsList: state.products.isLoadingProductsList
})

export default connect(mapStateToProps, { getProductsList })(ProductsTableField)
