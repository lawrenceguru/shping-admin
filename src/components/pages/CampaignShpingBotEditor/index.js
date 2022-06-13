import { connect } from 'react-redux'
import {
  rewardsUpdateCampaignBot,
  rewardsCreateCampaignBot,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsClearSelectedDuplicatedCampaignBot
} from 'store/actions'
import CampaignShpingBotEditor from './CampaignShpingBotEditor'

const mapStateToProps = state => ({
  isLoadingBot: state.rewards.isLoadingBot,
  updatedBot: state.rewards.updatedBot,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  bots: state.rewards.bots,
  duplicateId: state.rewards.duplicateId
})

export default connect(mapStateToProps, {
  rewardsCreateCampaignBot,
  rewardsUpdateCampaignBot,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsClearSelectedDuplicatedCampaignBot
})(CampaignShpingBotEditor)
