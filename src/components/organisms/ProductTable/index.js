import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { indexFieldsProductsGetBrands } from 'store/actions'
import ProductTable from './ProductTable'

const mapStateToProps = state => ({
  participants: state.identity.participants,
  isChangingParticipant: state.identity.isChangingParticipant,
  brands: state.indexFieldsProducts.brands
})

export default withRouter(connect(mapStateToProps, { indexFieldsProductsGetBrands })(ProductTable))
