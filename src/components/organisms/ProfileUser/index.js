import { connect } from 'react-redux'
import { settingsGetLanguages, identityPutAccount } from 'store/actions'
import { fromIdentity } from 'store/selectors'
import ProfileUser from './ProfileUser'

const mapStateToProps = state => ({
  languages: state.settings.languages,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  initialValues: fromIdentity.getSettingsProfileFormValues(state)
})
export default connect(mapStateToProps, { settingsGetLanguages, identityPutAccount })(ProfileUser)
