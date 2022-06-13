import { connect } from 'react-redux'
import { settingsGetCountries } from 'store/actions'
import ProductEditMadeInWidget from './ProductEditMadeInWidget'

const mapStateToProps = state => ({
  countries: state.settings.countries
})

export default connect(mapStateToProps, { settingsGetCountries })(ProductEditMadeInWidget)
