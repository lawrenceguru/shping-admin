import { connect } from 'react-redux'
import {
  getProductCompleteLike,
  indexFieldsProductsGetBrands,
  getGdtiAttachedGtin,
  gdtiAttachProducts,
  gdtiGlobalAttachProducts
} from 'store/actions'
import DocumentsAttachmentsTab from './DocumentsAttachmentsTab'

const mapStateToProps = state => ({
  allBrands: state.indexFieldsProducts.brands,
  completeList: state.products.completeList,
  completeListIsLoading: state.products.completeListIsLoading,
  isLoadingBrands: state.indexFieldsProducts.isLoadingBrands,
  attachedGtin: state.gdti.attachedGtin,
  attachedBrands: state.gdti.attachedBrands,
  isAllProducts: state.gdti.isAllProducts,
  positionProductInfo: state.gdti.positionProductInfo,
  positionProductInfoAll: state.gdti.positionProductInfoAll,
  attachedGtinIsLoading: state.gdti.attachedGtinIsLoading,
  getRequestAttachedGtinIsLoading: state.gdti.getRequestAttachedGtinIsLoading
})

export default connect(mapStateToProps, {
  getProductCompleteLike,
  indexFieldsProductsGetBrands,
  getGdtiAttachedGtin,
  gdtiAttachProducts,
  gdtiGlobalAttachProducts
})(DocumentsAttachmentsTab)
