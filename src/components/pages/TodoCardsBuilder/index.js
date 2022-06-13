import { connect } from 'react-redux'
import { todoGetTodoCards, todoDeleteTodoCards, todoSelectTodoCard } from 'store/actions'
import TodoCardsBuilder from './TodoCardsBuilder'

const mapStateToProps = state => ({
  isTodoCardsLoading: state.todoCardsBuilder.isTodoCardsLoading,
  todoCards: state.todoCardsBuilder.todoCards
})

export default connect(mapStateToProps, { todoGetTodoCards, todoDeleteTodoCards, todoSelectTodoCard })(TodoCardsBuilder)
