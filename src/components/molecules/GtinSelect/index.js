import { connect } from 'react-redux'
import { getProductCompleteLike } from 'store/actions'
import GtinSelect from './GtinSelect'

const mapStateToProps = state => ({
  completeList: state.products.completeList,
  completeListIsLoading: state.products.completeListIsLoading
})

export default connect(mapStateToProps, { getProductCompleteLike })(GtinSelect)
