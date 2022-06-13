import { connect } from 'react-redux'
import { serializationGetGtinSelect, getSerializationStepData, indexFieldsProductsGetBrands } from 'store/actions'
import SerializationSelectGtin from './Select'

const mapStateToProps = state => ({
  allData: state.serializationGtinSteps.allData,
  isLoading: state.serializationGtinSteps.isLoading,
  totalItems: state.serializationGtinSteps.count,
  skip: state.serializationGtinSteps.skip,
  take: state.serializationGtinSteps.take,
  brands: state.indexFieldsProducts.brands
})

export default connect(mapStateToProps, {
  serializationGetGtinSelect,
  getSerializationStepData,
  indexFieldsProductsGetBrands
})(SerializationSelectGtin)
