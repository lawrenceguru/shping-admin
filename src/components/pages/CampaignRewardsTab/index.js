import { connect } from 'react-redux'
import {
  rewardsGetCampaigns,
  rewardsDeleteCampaign,
  rewardsPutStatusOfCampaign,
  settingsGetRewardsActions,
  analyticsGetRewardsIndicators,
  rewardsDuplicateCampaign
} from 'store/actions'
import CampaignRewardsTab from './CampaignRewardsTab'

const mapStateToProps = state => ({
  campaigns: state.rewards.campaigns,
  isCharLoading: state.analytics.isCharLoading,
  isLoadingCampaigns: state.rewards.isLoadingCampaigns,
  isDeleting: state.rewards.isDeleting,
  rewardsActions: state.settings.rewardsActions,
  isLoadingActions: state.settings.isLoadingActions,
  isLoadingActivation: state.rewards.isLoadingActivation,
  indicators: state.analytics.indicators
})
export default connect(mapStateToProps, {
  rewardsGetCampaigns,
  rewardsDeleteCampaign,
  rewardsPutStatusOfCampaign,
  settingsGetRewardsActions,
  analyticsGetRewardsIndicators,
  rewardsDuplicateCampaign
})(CampaignRewardsTab)
