import { connect } from 'react-redux'
import { analyticsGetTotalUsers, settingsGetActiveUsers } from 'store/actions'
import AudiencePieTotalUsers from './AudiencePieTotalUsers'

const mapStateToProps = state => ({
  pastUsers: state.settings.activeUsersCount,
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry
})

export default connect(mapStateToProps, { analyticsGetTotalUsers, settingsGetActiveUsers })(AudiencePieTotalUsers)
