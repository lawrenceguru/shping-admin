import { connect } from 'react-redux'
import { todoSetStatusTodoDelivery } from 'store/actions'
import DeliveryCard from './DeliveryCard'

const mapStateToProps = state => ({
  todoCards: state.todoCardsBuilder.todoCards,
  currentParticipant: state.identity.current_participant,
  depositCoins: state.participant.coins
})

export default connect(mapStateToProps, { todoSetStatusTodoDelivery })(DeliveryCard)
