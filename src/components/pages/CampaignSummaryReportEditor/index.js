import { connect } from 'react-redux'
import { campaignsPostSummaryReport, settingsGetCountries, myTeamGetMyTeam } from 'store/actions'
import { fromIdentity } from 'store/selectors'
import CampaignSummaryReportEditor from './CampaignSummaryReportEditor'

const mapStateToProps = state => ({
  isLoading: state.campaignsSummary.isLoading,
  isUpdated: state.campaignsSummary.isUpdated,
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries,
  isSystem: fromIdentity.isSystem(state),
  team: state.myTeam.team,
  isLoadingTeam: state.myTeam.isLoadingTeam
})

export default connect(mapStateToProps, {
  campaignsPostSummaryReport,
  settingsGetCountries,
  myTeamGetMyTeam
})(CampaignSummaryReportEditor)
