import { connect } from 'react-redux'
import CampaignsRewardsSummary from './CampaignsRewardsSummary'

const mapStateToProps = state => ({
  rewardsActions: state.settings.rewardsActions
})

export default connect(mapStateToProps, null)(CampaignsRewardsSummary)
