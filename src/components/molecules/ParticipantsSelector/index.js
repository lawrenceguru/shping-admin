import { connect } from 'react-redux'
import { identityChangeParticipant } from 'store/actions'
import { fromIdentity } from 'store/selectors'
import ParticipantSelector from './ParticipantSelector'

const mapStateToProps = state => ({
  participants: state.identity.participants,
  isChangingParticipant: state.identity.isChangingParticipant,
  currentParticipant: state.identity.current_participant,
  isHaveSystem: fromIdentity.isHaveSystem(state)
})

export default connect(mapStateToProps, { identityChangeParticipant })(ParticipantSelector)
