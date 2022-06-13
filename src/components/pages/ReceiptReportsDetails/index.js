import { connect } from 'react-redux'
import { storeCardsGetReceiptReportDetails, storeCardsSetRecepitLocation } from 'store/actions'
import ReceiptReportsDetails from './ReceiptReportsDetails'

const mapStateToProps = state => ({
  isLoadingReceiptReportDetails: state.storeCards.isLoadingReceiptReportDetails,
  receiptReportDetails: state.storeCards.receiptReportDetails,
  isLocationChanging: state.storeCards.isLocationChanging
})

export default connect(mapStateToProps, { storeCardsGetReceiptReportDetails, storeCardsSetRecepitLocation })(
  ReceiptReportsDetails
)
