import { connect } from 'react-redux'
import { todoGetAdjustmentBudgetRateTodoDelivery, todoGetAdjustmentConvertedBudgetTodoDelivery } from 'store/actions'
import TodoDeliveryEditorForm from './TodoDeliveryEditorForm'

const mapStateToProps = state => ({
  convertedBudget: state.todoCardsDeliveries.convertedBudget,
  points: state.todoCardsDeliveries.points
})
export default connect(mapStateToProps, {
  todoGetAdjustmentConvertedBudgetTodoDelivery,
  todoGetAdjustmentBudgetRateTodoDelivery
})(TodoDeliveryEditorForm)
