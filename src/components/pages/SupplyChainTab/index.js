import { connect } from 'react-redux'
import {
  participantGetSupplyParticipants,
  deleteParticipant,
  settingsGetCountries,
  editParticipant,
  getParticipantLocation,
  selectParticipant
} from 'store/actions'
import SupplyChainTab from './SupplyChainTab'

const mapStateToProps = state => ({
  skip: state.supplyChain.offset,
  take: state.supplyChain.limit,
  allItems: state.supplyChain.supplyParticipants,
  totalItems: state.supplyChain.count,
  isLoading: state.supplyChain.isSupplyParticipantsLoading,
  sortBy: state.supplyChain.sortBy,
  countries: state.settings.countries,
  supplyParticipantsLocations: state.supplyChainLocations.supplyParticipantsLocations,
  isSupplyParticipantsLocationLoading: state.supplyChainLocations.isSupplyParticipantsLocationLoading
})

export default connect(mapStateToProps, {
  participantGetSupplyParticipants,
  deleteParticipant,
  settingsGetCountries,
  editParticipant,
  getParticipantLocation,
  selectParticipant
})(SupplyChainTab)
