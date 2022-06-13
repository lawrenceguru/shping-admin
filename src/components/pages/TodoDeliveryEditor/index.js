import { connect } from 'react-redux'
import {
  settingsGetCountries,
  settingsGetLanguages,
  todoCreateTodoDelivery,
  todoUpdateTodoDelivery,
  todoClearSelectedTodoDelivery,
  todoGetTodoCards
} from 'store/actions'
import TodoDeliveryEditor from './TodoDeliveryEditor'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  products: state,
  todoCards: state.todoCardsBuilder.todoCards,
  todoDeliveries: state.todoCardsDeliveries.todoDeliveries,
  isTodoCardsLoading: state.todoCardsBuilder.isTodoCardsLoading,
  editItemId: state.todoCardsDeliveries.editItemId,
  updated: state.todoCardsDeliveries.updated
})
export default connect(mapStateToProps, {
  settingsGetCountries,
  settingsGetLanguages,
  todoCreateTodoDelivery,
  todoUpdateTodoDelivery,
  todoClearSelectedTodoDelivery,
  todoGetTodoCards
})(TodoDeliveryEditor)
