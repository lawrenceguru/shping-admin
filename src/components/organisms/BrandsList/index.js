import { connect } from 'react-redux'
import { fromIdentity } from 'store/selectors'
import { customerGetBrands, customerAddBrand, customerEditBrand, customerDeleteBrand, postUpload } from 'store/actions'
import BrandsList from './BrandsList'

const mapStateToProps = state => ({
  brands: state.customer.brands,
  isLoadingBrands: state.customer.isLoadingBrands,
  isUpdatingBrands: state.customer.isUpdatingBrands,
  isSystem: fromIdentity.isSystem(state)
})

export default connect(mapStateToProps, {
  customerGetBrands,
  customerAddBrand,
  customerEditBrand,
  customerDeleteBrand,
  postUpload
})(BrandsList)
