import { connect } from 'react-redux'
import SerializationSSCCConfirm from './SerializationSSCCConfirm'

const mapStateToProps = state => ({
  company: state.serializationSsccTasks.company_prefix,
  order: state.serializationSsccTasks.sequence,
  serialNumber: state.serializationSsccTasks.serial_number,
  sscc: state.serializationSsccTasks.count
})

export default connect(mapStateToProps, {})(SerializationSSCCConfirm)
