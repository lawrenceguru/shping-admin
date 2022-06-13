import { connect } from 'react-redux'
import { analyticsGetCampaignsChart } from 'store/actions'
import CampaignsRewardsGraph from './CampaignsRewardsGraph'

const mapStateToProps = state => ({
  chart: state.analytics.chart
})

export default connect(mapStateToProps, { analyticsGetCampaignsChart })(CampaignsRewardsGraph)
