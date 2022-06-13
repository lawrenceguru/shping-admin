import { connect } from 'react-redux'
import {
  settingsGetCountries,
  settingsGetLanguages,
  rewardsPutCampaignReminder,
  rewardsPostCampaignReminder
} from 'store/actions'
import CampaignReminderEditor from './CampaignReminderEditor'

const mapStateToProps = state => ({
  isLoadingReminders: state.rewards.isLoadingReminders,
  updatedReminder: state.rewards.updatedReminder,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  reminders: state.rewards.reminders
})

export default connect(mapStateToProps, {
  settingsGetCountries,
  settingsGetLanguages,
  rewardsPutCampaignReminder,
  rewardsPostCampaignReminder
})(CampaignReminderEditor)
