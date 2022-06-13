import { connect } from 'react-redux'
import {
  todoGetTodoCards,
  todoDeleteTodoCards,
  todoSelectTodoCard,
  todoCreateTodoCards,
  todoUpdateTodoCards,
  todoClearSelectedTodoCard
} from 'store/actions'
import Editor from './TodoCardsEditor'

const mapStateToProps = state => ({
  todoCards: state.todoCardsBuilder.todoCards,
  editItemId: state.todoCardsBuilder.editItemId,
  isTodoCardsUpdating: state.todoCardsBuilder.isTodoCardsUpdating,
  isTodoCardsCreating: state.todoCardsBuilder.isTodoCardsCreating,
  updated: state.todoCardsBuilder.updated
})

export default connect(mapStateToProps, {
  todoGetTodoCards,
  todoDeleteTodoCards,
  todoSelectTodoCard,
  todoCreateTodoCards,
  todoUpdateTodoCards,
  todoClearSelectedTodoCard
})(Editor)
