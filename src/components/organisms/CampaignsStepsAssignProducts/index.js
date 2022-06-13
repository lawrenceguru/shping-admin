import { connect } from 'react-redux'
import { getGdtiForRewardsCompleteLike, getProductsInfo } from 'store/actions'
import CampaignsStepsAssignProducts from './CampaignsStepsAssignProducts'

const mapStateToProps = state => ({
  completeList: state.products.completeList,
  completeListIsLoading: state.products.completeListIsLoading,
  productInfo: state.products.productInfo,
  isLoadingProductInfo: state.products.isLoadingProductInfo
})

export default connect(mapStateToProps, { getGdtiForRewardsCompleteLike, getProductsInfo })(
  CampaignsStepsAssignProducts
)
