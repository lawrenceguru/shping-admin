import { connect } from 'react-redux'
import OverviewEngagementPanel from './OverviewEngagementPanel'

const mapStateToProps = state => ({
  selectRange: state.filterAnalytics.selectRange,
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry
})

export default connect(mapStateToProps)(OverviewEngagementPanel)
