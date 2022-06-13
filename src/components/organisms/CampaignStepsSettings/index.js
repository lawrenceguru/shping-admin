import { connect } from 'react-redux'
import { settingsGetRewardsActions, rewardsGetAdjustmentBudgetRate } from 'store/actions'
import { fromIdentity } from 'store/selectors'
import CampaignStepsSettings from './CampaignStepsSettings'

const mapStateToProps = state => ({
  rewardsActions: state.settings.rewardsActions,
  isLoadingActions: state.settings.isLoadingActions,
  convertedBudget: state.todoCardsDeliveries.convertedBudget,
  points: state.rewards.points,
  isSystem: fromIdentity.isSystem(state)
})

export default connect(mapStateToProps, { settingsGetRewardsActions, rewardsGetAdjustmentBudgetRate })(
  CampaignStepsSettings
)
