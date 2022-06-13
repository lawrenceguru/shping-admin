import { connect } from 'react-redux'
import { campaignsGetDetailsForSummaryReports } from 'store/actions'
import CampaignSummaryReportsShowForm from './CampaignSummaryReportsShowForm'

const mapStateToProps = state => ({
  isLoading: state.campaignsSummary.isLoading,
  details: state.campaignsSummary.details
})

export default connect(mapStateToProps, { campaignsGetDetailsForSummaryReports })(CampaignSummaryReportsShowForm)
