import { connect } from 'react-redux'
import OverviewSerializationTab from './OverviewSerializationTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.serializationAnalyticsFilters.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps, null)(OverviewSerializationTab)
