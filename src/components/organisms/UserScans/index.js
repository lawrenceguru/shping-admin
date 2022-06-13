import { connect } from 'react-redux'
import { usersGetUsersScans, settingsGetCountries, settingsGetLanguages } from 'store/actions'
import UserScans from './UserScans'

const mapStateToProps = state => ({
  isLoadingScans: state.users.isLoadingScans,
  scans: state.users.scans,
  count: state.users.countScans,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages
})

export default connect(mapStateToProps, {
  usersGetUsersScans,
  settingsGetCountries,
  settingsGetLanguages
})(UserScans)
