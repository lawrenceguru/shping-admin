import { connect } from 'react-redux'
import { importTasksGetImportParticipantHistory } from 'store/actions'
import AllImportTasksHistory from './AllImportTasksHistory'

const mapStateToProps = state => ({
  participantHistory: state.importTasks.participantHistory,
  participantHistoryIsLoading: state.importTasks.participantHistoryIsLoading
})

export default connect(mapStateToProps, { importTasksGetImportParticipantHistory })(AllImportTasksHistory)
