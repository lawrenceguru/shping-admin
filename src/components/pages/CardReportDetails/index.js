import { connect } from 'react-redux'
import { storeCardsGetCardReportDetails } from 'store/actions'
import CardReportDetails from './CardReportDetails'

const mapStateToProps = state => ({
  isLoadingCardReportDetails: state.storeCards.isLoadingCardReportDetails,
  cardReportDetails: state.storeCards.cardReportDetails
})

export default connect(mapStateToProps, { storeCardsGetCardReportDetails })(CardReportDetails)
