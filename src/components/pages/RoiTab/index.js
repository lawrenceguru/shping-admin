import { connect } from 'react-redux'
import RoiTab from './RoiTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps, null)(RoiTab)
