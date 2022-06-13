import { connect } from 'react-redux'
import RoiCalendar from './RoiCalendar'

const mapStateToProps = state => ({
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate
})

export default connect(mapStateToProps)(RoiCalendar)
