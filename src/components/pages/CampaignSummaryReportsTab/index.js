import { connect } from 'react-redux'
import { campaingsGetSummaryReports, campaignsDeleteSummaryReport, settingsGetCountries } from 'store/actions'
import CampaignSummaryReportsTab from './CampaignSummaryReportsTab'

const mapStateToProps = state => ({
  isLoading: state.campaignsSummary.isLoading,
  reports: state.campaignsSummary.reports,
  deletingId: state.campaignsSummary.deletingId,
  participants: state.identity.participants,
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries,
  team: state.myTeam.team
})

export default connect(mapStateToProps, {
  campaingsGetSummaryReports,
  campaignsDeleteSummaryReport,
  settingsGetCountries
})(CampaignSummaryReportsTab)
