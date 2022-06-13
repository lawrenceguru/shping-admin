import { connect } from 'react-redux'
import GeographyTab from './GeographyTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps)(GeographyTab)
