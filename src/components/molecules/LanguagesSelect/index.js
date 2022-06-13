import { connect } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import LanguagesSelect from './LanguagesSelect'

const mapStateToProps = state => ({
  languages: state.settings.languages,
  isLoadingLanguages: state.settings.isLoadingLanguages
})

export default connect(mapStateToProps, { settingsGetLanguages })(LanguagesSelect)
