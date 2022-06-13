import { connect } from 'react-redux'
import { campaignsFeaturedStatusToggle, campaignsFeaturedGetFeaturedList } from 'store/actions'
import CampaignFeaturedProductsTab from './CampaignFeaturedProductsTab'

const mapStateToProps = state => ({
  isLoading: state.campaignsFeatured.isLoading,
  featuredList: state.campaignsFeatured.featuredList,
  isUpdating: state.campaignsFeatured.isUpdating
})

export default connect(mapStateToProps, { campaignsFeaturedStatusToggle, campaignsFeaturedGetFeaturedList })(
  CampaignFeaturedProductsTab
)
