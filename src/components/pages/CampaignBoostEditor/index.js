import { connect } from 'react-redux'
import {
  rewardsPutCampaignBoost,
  rewardsPostCampaignBoost,
  settingsGetCountries,
  settingsGetLanguages
} from 'store/actions'
import CampaignBoostEditor from './CampaignBoostEditor'

const mapStateToProps = state => ({
  isLoadingBoosts: state.rewards.isLoadingBoosts,
  updatedBoosts: state.rewards.updatedBoosts,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  boosts: state.rewards.boosts
})

export default connect(mapStateToProps, {
  rewardsPostCampaignBoost,
  rewardsPutCampaignBoost,
  settingsGetCountries,
  settingsGetLanguages
})(CampaignBoostEditor)
