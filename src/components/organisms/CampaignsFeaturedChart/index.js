import { connect } from 'react-redux'
import { campaignsFeaturedGetFeaturedChart } from 'store/actions'
import CampaignsFeaturedChart from './CampaignsFeaturedChart'

const mapStateToProps = state => ({
  chartIsLoading: state.campaignsFeatured.chartIsLoading,
  chart: state.campaignsFeatured.chart
})

export default connect(mapStateToProps, { campaignsFeaturedGetFeaturedChart })(CampaignsFeaturedChart)
