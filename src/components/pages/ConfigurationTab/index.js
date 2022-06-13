import { connect } from 'react-redux'
import {
  storeCardsGetAllEntries,
  settingsGetCountries,
  storeCardsAddCountry,
  storeCardsDeleteCountry
} from 'store/actions'
import ConfigurationTab from './ConfigurationTab'

const mapStateToProps = state => ({
  allEntriesIsLoading: state.storeCards.allEntriesIsLoading,
  isUpdatingCountries: state.storeCards.isUpdatingCountries,
  entries: state.storeCards.entries,
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries
})

export default connect(mapStateToProps, {
  storeCardsGetAllEntries,
  storeCardsAddCountry,
  storeCardsDeleteCountry,
  settingsGetCountries
})(ConfigurationTab)
