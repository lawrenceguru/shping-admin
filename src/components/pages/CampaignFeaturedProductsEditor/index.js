import { connect } from 'react-redux'
import { campaignsFeaturedPostCampaignFeatured, campaignsFeaturedPutCampaignFeatured } from 'store/actions'
import CampaignsFeaturedProductsEditor from './CampaignsFeaturedProductsEditor'

const mapStateToProps = state => ({
  isLoading: state.campaignsFeatured.isLoading,
  updated: state.campaignsFeatured.updated,
  featuredList: state.campaignsFeatured.featuredList
})

export default connect(mapStateToProps, {
  campaignsFeaturedPostCampaignFeatured,
  campaignsFeaturedPutCampaignFeatured
})(CampaignsFeaturedProductsEditor)
