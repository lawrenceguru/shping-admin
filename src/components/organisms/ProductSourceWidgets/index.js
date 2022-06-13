import { connect } from 'react-redux'
import { settingsGetCountries } from 'store/actions'
import ProductSourceWidgets from './ProductSourceWidgets'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  languages: state.settings.languages
})

export default connect(mapStateToProps, { settingsGetCountries })(ProductSourceWidgets)
