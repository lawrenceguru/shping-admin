import { connect } from 'react-redux'
import { rewardsCampaignReminderStatusToggle, rewardsGetCampaignReminders } from 'store/actions'
import CampaignReminderTab from './CampaignReminderTab'

const mapStateToProps = state => ({
  reminders: state.rewards.reminders,
  isLoadingReminders: state.rewards.isLoadingReminders,
  isActivatedReminder: state.rewards.isActivatedReminder
})

export default connect(mapStateToProps, { rewardsGetCampaignReminders, rewardsCampaignReminderStatusToggle })(
  CampaignReminderTab
)
