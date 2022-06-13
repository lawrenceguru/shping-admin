import { connect } from 'react-redux'
import { rewardsCampaignBoostStatusToggle, rewardsGetCampaignBoosts } from 'store/actions'
import CampaignBoostTab from './CampaignBoostTab'

const mapStateToProps = state => ({
  isLoadingBoosts: state.rewards.isLoadingBoosts,
  boosts: state.rewards.boosts,
  activatedBoostId: state.rewards.activatedBoostId
})

export default connect(mapStateToProps, { rewardsCampaignBoostStatusToggle, rewardsGetCampaignBoosts })(
  CampaignBoostTab
)
