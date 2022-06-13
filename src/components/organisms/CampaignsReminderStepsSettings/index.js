import { connect } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import CampaignsReminderStepsSettings from './CampaignsReminderStepsSettings'

const mapStateToProps = state => ({
  languages: state.settings.languages,
  isLoadingLanguages: state.settings.isLoadingLanguages
})

export default connect(mapStateToProps, { settingsGetLanguages })(CampaignsReminderStepsSettings)
