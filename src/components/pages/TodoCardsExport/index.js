import { connect } from 'react-redux'
import {
  todoGetTodoExportTasks,
  todoGetStatusExportTask,
  todoGetStatusAllExportTasks,
  todoGetTodoDeliveries
} from 'store/actions'
import TodoCardsExport from './TodoCardsExport'

const mapStateToProps = state => ({
  isTodoDeliveriesLoading: state.todoCardsDeliveries.isTodoDeliveriesLoading,
  todoDeliveries: state.todoCardsDeliveries.todoDeliveries,
  isTasksForExportLoading: state.todoCardsExport.isTasksForExportLoading,
  isTaskForExportLoadingId: state.todoCardsExport.isTaskForExportLoadingId,
  exportTasksStatus: state.todoCardsExport.exportTasksStatus,
  participants: state.identity.participants
})

export default connect(mapStateToProps, {
  todoGetTodoExportTasks,
  todoGetStatusExportTask,
  todoGetStatusAllExportTasks,
  todoGetTodoDeliveries
})(TodoCardsExport)
