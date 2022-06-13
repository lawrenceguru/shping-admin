import { connect } from 'react-redux'
import { settingsGetCountries, settingsGetTextTypes } from 'store/actions'
import ProductEditTextWidget from './ProductEditTextWidget'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  languages: state.settings.languages,
  textTypes: state.settings.textTypes,
  isLoadingTextTypes: state.settings.isLoadingTextTypes
})

export default connect(mapStateToProps, { settingsGetCountries, settingsGetTextTypes })(ProductEditTextWidget)
