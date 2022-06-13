import { connect } from 'react-redux'
import OverviewTab from './OverviewTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps, null)(OverviewTab)
