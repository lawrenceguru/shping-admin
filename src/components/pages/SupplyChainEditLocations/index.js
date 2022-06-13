import { connect } from 'react-redux'
import {
  createParticipantLocation,
  settingsGetCountries,
  updateParticipantLocation,
  clearSelectedLocation
} from 'store/actions'
import SupplyChainEditLocations from './SupplyChainEditLocations'

const mapStateToProps = state => ({
  supplyParticipantsLocations: state.supplyChainLocations.supplyParticipantsLocations,
  selectedParticipantId: state.supplyChain.selectedParticipantId,
  isSupplyParticipantsLocationCreating: state.supplyChainLocations.isSupplyParticipantsLocationCreating,
  locationData: state.supplyChainLocations.locationData,
  countries: state.settings.countries,
  isNeedReturnToLocationsPage: state.supplyChainLocations.isNeedReturnToLocationsPage
})

export default connect(mapStateToProps, {
  createParticipantLocation,
  settingsGetCountries,
  updateParticipantLocation,
  clearSelectedLocation
})(SupplyChainEditLocations)
