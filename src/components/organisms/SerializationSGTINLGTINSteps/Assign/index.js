import { connect } from 'react-redux'
import { getParticipantLocation, settingsGetCountries, participantGetSupplyParticipants } from 'store/actions'
import Assign from './Assign'

const mapStateToProps = state => ({
  supplyParticipantsLocations: state.supplyChainLocations.supplyParticipantsLocations,
  isSupplyParticipantsLocationLoading: state.supplyChainLocations.isSupplyParticipantsLocationLoading,
  countries: state.settings.countries,
  supplyParticipants: state.supplyChain.supplyParticipants
})

export default connect(mapStateToProps, {
  getParticipantLocation,
  settingsGetCountries,
  participantGetSupplyParticipants
})(Assign)
