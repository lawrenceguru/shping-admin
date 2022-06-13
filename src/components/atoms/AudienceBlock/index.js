import { connect } from 'react-redux'
import { settingsGetCountries, settingsGetLanguages } from 'store/actions'
import AudienceBlock from './AudienceBlock'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages
})

export default connect(mapStateToProps, { settingsGetCountries, settingsGetLanguages })(AudienceBlock)
