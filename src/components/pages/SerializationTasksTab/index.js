import { connect } from 'react-redux'
import { serializationGetItems, serializeGetSSCCTasksStatus } from 'store/actions'
import SerializationTasksTab from './SerializationTasksTab'

const mapStateToProps = state => ({
  totalItems: state.serializationTasks.totalItems,
  isLoading: state.serializationTasks.isLoading,
  allData: state.serializationTasks.all,
  limit: state.serializationTasks.limit,
  offset: state.serializationTasks.offset,
  ssccTasksIsLoading: state.serializationTasks.ssccTasksIsLoading,
  ssccTasks: state.serializationTasks.ssccTasks
})

export default connect(mapStateToProps, { serializationGetItems, serializeGetSSCCTasksStatus })(SerializationTasksTab)
