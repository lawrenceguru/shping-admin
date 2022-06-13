import { connect } from 'react-redux'
import {
  todoGetTodoDeliveries,
  todoDeleteTodoDelivery,
  participantGetParticipantDeposit,
  todoSelectTodoDelivery
} from 'store/actions'
import TodoCardsDeliveries from './TodoCardsDeliveries'

const mapStateToProps = state => ({
  isTodoDeliveriesLoading: state.todoCardsDeliveries.isTodoDeliveriesLoading,
  isTodoDeliveryDeleting: state.todoCardsDeliveries.isTodoDeliveryDeleting,
  todoDeliveries: state.todoCardsDeliveries.todoDeliveries
})

export default connect(mapStateToProps, {
  todoGetTodoDeliveries,
  todoDeleteTodoDelivery,
  participantGetParticipantDeposit,
  todoSelectTodoDelivery
})(TodoCardsDeliveries)
