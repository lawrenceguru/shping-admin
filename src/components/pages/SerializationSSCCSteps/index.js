import { connect } from 'react-redux'
import { createSerializationGetSSCCOptions, clearSerializationGetSSCCOptions } from 'store/actions'
import SerializationSSCCSteps from './SerializationSSCCSteps'

const mapStateToProps = () => ({})

export default connect(mapStateToProps, { createSerializationGetSSCCOptions, clearSerializationGetSSCCOptions })(
  SerializationSSCCSteps
)
