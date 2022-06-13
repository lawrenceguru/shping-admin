import { connect } from 'react-redux'
import { storeCardsGetReceiptsReports, storeCardsGetAllEntries } from 'store/actions'
import ReceiptsReportsTab from './ReceiptsReportsTab'

const mapStateToProps = state => ({
  reports: state.storeCards.reports,
  filters: state.storeCards.filtersReceipts,
  countries: state.storeCards.entries,
  isLoadingCountries: state.storeCards.allEntriesIsLoading,
  isLoadingReports: state.storeCards.isLoadingReports,
  stores: state.storeCards.stores
})

export default connect(mapStateToProps, { storeCardsGetAllEntries, storeCardsGetReceiptsReports })(ReceiptsReportsTab)
