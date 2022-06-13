import { connect } from 'react-redux'
import { createOrUpdateParticipant } from 'store/actions'
import SupplyChainEditParticipant from './SupplyChainEditParticipant'

const mapStateToProps = state => ({
  participantData: state.supplyChain.currentParticipantData,
  countries: state.supplyChain.countries,
  participants: state.identity.participants
})

export default connect(mapStateToProps, { createOrUpdateParticipant })(SupplyChainEditParticipant)
