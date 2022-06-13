import { connect } from 'react-redux'
import AudienceTab from './AudienceTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps)(AudienceTab)
