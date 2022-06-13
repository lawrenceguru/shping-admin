import { connect } from 'react-redux'
import { settingsGetCountries } from 'store/actions'
import CountrySelect from './CountrySelect'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries
})

export default connect(mapStateToProps, { settingsGetCountries })(CountrySelect)
