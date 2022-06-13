import { connect } from 'react-redux'
import { getParticipantLocation, deleteParticipantLocation, selectLocation } from 'store/actions'
import SupplyChainLocations from './SupplyChainLocations'

const mapStateToProps = state => ({
  countries: state.supplyChain.countries,
  supplyParticipantsLocations: state.supplyChainLocations.supplyParticipantsLocations,
  selectedParticipantId: state.supplyChain.selectedParticipantId,
  isSupplyParticipantsLocationLoading: state.supplyChainLocations.isSupplyParticipantsLocationLoading,
  isSupplyParticipantsLocationDeleting: state.supplyChainLocations.isSupplyParticipantsLocationDeleting
})

export default connect(mapStateToProps, { getParticipantLocation, deleteParticipantLocation, selectLocation })(
  SupplyChainLocations
)
