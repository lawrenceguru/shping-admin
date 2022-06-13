import { connect } from 'react-redux'
import { operationsGetItems } from 'store/actions'
import TTOperations from './TTOperations'

const mapStateToProps = state => ({
  isLoading: state.ttOperations.isLoading,
  limit: state.ttOperations.limit,
  allItems: state.ttOperations.all,
  sortOrder: state.ttOperations.sortOrder
})

export default connect(mapStateToProps,
  { operationsGetItems }
)(TTOperations)
