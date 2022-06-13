import { connect } from 'react-redux'
import { importTasksGetImportParticipants } from 'store/actions'
import AllImportTasksTab from './AllImportTasksTab'

const mapStateToProps = state => ({
  participants: state.importTasks.participants,
  participantsIsLoading: state.importTasks.participantsIsLoading
})

export default connect(mapStateToProps, { importTasksGetImportParticipants })(AllImportTasksTab)
