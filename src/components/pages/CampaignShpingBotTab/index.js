import { connect } from 'react-redux'
import { rewardsDeleteCampaignBot, rewardsGetCampaignBots, rewardsDuplicateCampaignBot } from 'store/actions'
import CampaignShpingBotTab from './CampaignShpingBotTab'

const mapStateToProps = state => ({
  bots: state.rewards.bots,
  isLoadingBots: state.rewards.isLoadingBots,
  isBotDeleting: state.rewards.isBotDeleting
})

export default connect(mapStateToProps, {
  rewardsDeleteCampaignBot,
  rewardsGetCampaignBots,
  rewardsDuplicateCampaignBot
})(CampaignShpingBotTab)
