import { connect } from 'react-redux'
import {
  serializedProductsGetProducts,
  indexFieldsSerializationGetIndexInfo,
  serializedProductsSetProductsOrder
} from 'store/actions'
import SerializedProductsTab from './SerializedProductsTab'

const mapStateToProps = state => ({
  products: state.serializedProducts.products,
  count: state.serializedProducts.count,
  isLoadingSerializedProducts: state.serializedProducts.isLoadingSerializedProducts,
  customIndexFields: state.indexFieldsSerialization.customIndexFields,
  prevIndexFields: state.indexFieldsSerialization.prevIndexFields,
  defaultIndexFields: state.indexFieldsSerialization.defaultIndexFields,
  isLoadingIndexInfo: state.indexFieldsSerialization.isLoadingIndexInfo,
  currentParticipant: state.identity.current_participant,
  orderState: state.serializedProducts.order
})

export default connect(mapStateToProps, {
  serializedProductsGetProducts,
  indexFieldsSerializationGetIndexInfo,
  serializedProductsSetProductsOrder
})(SerializedProductsTab)
