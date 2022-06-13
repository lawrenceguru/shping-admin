import { connect } from 'react-redux'
import { serializationGetSSCCOptions } from 'store/actions'
import SerializationSSCCOptions from './SerializationSSCCOptions'

const mapStateToProps = state => ({
  values: state.serializationSsccTasks
})

export default connect(mapStateToProps, { serializationGetSSCCOptions })(SerializationSSCCOptions)
