import { connect } from 'react-redux'
import { serializationGetGtinValues } from 'store/actions'
import SerializationGTINSteps from './SerializationGTINSteps'

const mapStateToProps = () => ({})

export default connect(mapStateToProps, { serializationGetGtinValues })(SerializationGTINSteps)
