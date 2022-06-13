import { connect } from 'react-redux'
import SpendTab from './SpendTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps, null)(SpendTab)
