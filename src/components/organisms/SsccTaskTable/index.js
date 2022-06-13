import { connect } from 'react-redux'
import { serializeGetSSCCTasksStatus } from 'store/actions'
import SsccTaskTable from './SsccTaskTable'

const mapStateToProps = state => ({
  ssccTasksIsLoading: state.serializationTasks.ssccTasksIsLoading,
  ssccTasks: state.serializationTasks.ssccTasks
})

export default connect(mapStateToProps, { serializeGetSSCCTasksStatus })(SsccTaskTable)
