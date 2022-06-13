import { connect } from 'react-redux'
import {
  rewardsUpdateCampaignShoutouts,
  rewardsCreateCampaignShoutouts,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsClearSelectedDuplicatedCampaignShoutout
} from 'store/actions'
import CampaignShoutoutsEditor from './CampaignShoutoutsEditor'

const mapStateToProps = state => ({
  isLoadingShoutout: state.rewards.isLoadingShoutout,
  updatedShoutout: state.rewards.updatedShoutout,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  shoutouts: state.rewards.shoutouts,
  duplicateIdShoutout: state.rewards.duplicateIdShoutout
})

export default connect(mapStateToProps, {
  rewardsUpdateCampaignShoutouts,
  rewardsCreateCampaignShoutouts,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsClearSelectedDuplicatedCampaignShoutout
})(CampaignShoutoutsEditor)
