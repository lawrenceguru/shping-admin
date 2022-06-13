import { connect } from 'react-redux'
import { fromIdentity } from 'store/selectors'
import WidgetHeaderSwitchMode from './WidgetHeaderSwitchMode'

const mapStateToProps = state => ({
  isSystem: fromIdentity.isSystem(state)
})

export default connect(mapStateToProps, null)(WidgetHeaderSwitchMode)
