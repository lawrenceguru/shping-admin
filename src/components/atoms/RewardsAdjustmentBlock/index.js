import { connect } from 'react-redux'
import RewardsAdjustmentBlock from './RewardsAdjustmentBlock'

const mapStateToProps = state => ({
  convertedBudget: state.todoCardsDeliveries.convertedBudget
})

export default connect(mapStateToProps, null)(RewardsAdjustmentBlock)
