import { connect } from 'react-redux'
import {
  settingsGetCountries,
  settingsGetLanguages,
  rewardsPostCampaign,
  rewardsPutCampaign,
  todoClearConvertedBudget,
  rewardsClearSelectedDuplicatedCampaign
} from 'store/actions'
import CampaignRewardsEditor from './CampaignRewardsEditor'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  isLoading: state.rewards.isLoading,
  updated: state.rewards.updated,
  campaigns: state.rewards.campaigns,
  duplicateIdCampaign: state.rewards.duplicateIdCampaign
})

export default connect(mapStateToProps, {
  settingsGetLanguages,
  settingsGetCountries,
  rewardsPostCampaign,
  rewardsPutCampaign,
  todoClearConvertedBudget,
  rewardsClearSelectedDuplicatedCampaign
})(CampaignRewardsEditor)
