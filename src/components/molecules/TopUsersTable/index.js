import { connect } from 'react-redux'
import TopUsersTable from './TopUsersTable'

const mapStateToProps = state => ({
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectRange: state.filterAnalytics.selectRange,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry
})

export default connect(mapStateToProps, {})(TopUsersTable)
