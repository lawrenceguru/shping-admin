import { connect } from 'react-redux'
import ConversionTab from './ConversionTab'

const mapStateToProps = state => ({
  isLoadingNewFiltersInfo: state.filterAnalytics.isLoadingNewFiltersInfo
})

export default connect(mapStateToProps)(ConversionTab)
