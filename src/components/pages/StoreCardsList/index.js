import { connect } from 'react-redux'
import { storeCardsGetCountryCards, storeCardsDeleteCountryCards } from 'store/actions'
import StoreCardsList from './StoreCardsList'

const mapStateToProps = state => ({
  countryCards: state.storeCards.countryCards,
  countryCardsIsLoading: state.storeCards.countryCardsIsLoading,
  deletingCardId: state.storeCards.deletingCardId
})

export default connect(mapStateToProps, { storeCardsGetCountryCards, storeCardsDeleteCountryCards })(StoreCardsList)
