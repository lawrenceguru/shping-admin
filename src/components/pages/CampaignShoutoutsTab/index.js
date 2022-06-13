import { connect } from 'react-redux'
import {
  rewardsGetCampaignShoutouts,
  rewardsDeleteCampaignShoutouts,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsDuplicateCampaignShoutout
} from 'store/actions'
import CampaignShoutoutsTab from './CampaignShoutoutsTab'

const mapStateToProps = state => ({
  isLoadingShoutouts: state.rewards.isLoadingShoutouts,
  isShoutoutDeleting: state.rewards.isShoutoutDeleting,
  shoutouts: state.rewards.shoutouts,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages
})

export default connect(mapStateToProps, {
  rewardsGetCampaignShoutouts,
  rewardsDeleteCampaignShoutouts,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsDuplicateCampaignShoutout
})(CampaignShoutoutsTab)
