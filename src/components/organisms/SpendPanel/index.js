import { connect } from 'react-redux'
import SpendPanel from './SpendPanel'

const mapStateToProps = state => ({
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry,
  selectRange: state.filterAnalytics.selectRange,
  selectGtin: state.filterAnalytics.selectGtin
})

export default connect(mapStateToProps)(SpendPanel)
