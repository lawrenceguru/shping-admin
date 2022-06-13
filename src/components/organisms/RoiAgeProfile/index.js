import { connect } from 'react-redux'
import RoiAgeProfile from './RoiAgeProfile'

const mapStateToProps = state => ({
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry,
  selectGtin: state.filterAnalytics.selectGtin
})

export default connect(mapStateToProps)(RoiAgeProfile)
