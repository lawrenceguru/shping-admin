import { connect } from 'react-redux'
import { serializationGetItems } from 'store/actions'
import SgtinLgtinTaskTable from './SgtinLgtinTaskTable'

const mapStateToProps = state => ({
  totalItems: state.serializationTasks.totalItems,
  isLoading: state.serializationTasks.isLoading,
  allData: state.serializationTasks.all,
  limit: state.serializationTasks.limit,
  offset: state.serializationTasks.offset
})

export default connect(mapStateToProps, { serializationGetItems })(SgtinLgtinTaskTable)
