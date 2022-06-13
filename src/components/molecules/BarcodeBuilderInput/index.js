import { connect } from 'react-redux'
import BarcodeBuilderInput from './BarcodeBuilderInput'

const mapStateToProps = state => ({
  currentParticipant: state.identity.current_participant,
  participants: state.identity.participants
})

export default connect(mapStateToProps)(BarcodeBuilderInput)
