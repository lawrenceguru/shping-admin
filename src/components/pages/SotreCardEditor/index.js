import { connect } from 'react-redux'
import { storeCardsFormCountryCards } from 'store/actions'
import StoreCardEditor from './StoreCardEditor'

const mapStateToProps = state => ({
  countryCards: state.storeCards.countryCards,
  isUpdatingCards: state.storeCards.isUpdatingCards,
  isSuccessUpdate: state.storeCards.isSuccessUpdate
})

export default connect(mapStateToProps, { storeCardsFormCountryCards })(StoreCardEditor)
