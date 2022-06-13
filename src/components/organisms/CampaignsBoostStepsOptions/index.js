import { connect } from 'react-redux'
import { getProductCompleteLike, getProductsInfo } from 'store/actions'
import CampaignsBoostStepsOptions from './CampaignsBoostStepsOptions'

const mapStateToProps = state => ({
  completeList: state.products.completeList,
  completeListIsLoading: state.products.completeListIsLoading,
  productInfo: state.products.productInfo,
  isLoadingProductInfo: state.products.isLoadingProductInfo
})

export default connect(mapStateToProps, { getProductCompleteLike, getProductsInfo })(CampaignsBoostStepsOptions)
