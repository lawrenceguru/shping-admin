import { connect } from 'react-redux'
import { storeCardsGetCardsReport, storeCardsGetCountryCards, storeCardsGetAllEntries } from 'store/actions'
import CardReports from './CardReports'

export const mapStateToProps = state => ({
  reports: state.storeCards.reports,
  countryCards: state.storeCards.countryCards,
  isLoadingReports: state.storeCards.isLoadingReports,
  filters: state.storeCards.filters,
  countries: state.storeCards.entries,
  isLoadingCountries: state.storeCards.allEntriesIsLoading
})

export default connect(mapStateToProps, {
  storeCardsGetCardsReport,
  storeCardsGetCountryCards,
  storeCardsGetAllEntries
})(CardReports)
