import { connect } from 'react-redux'
import { filterAnalyticSetAdsMode } from 'store/actions'
import CrossMarketingPerformanceGraph from './CrossMarketingPerformanceGraph'

const mapStateToProps = state => ({
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCountry: state.filterAnalytics.selectCountry
})

export default connect(mapStateToProps, { filterAnalyticSetAdsMode })(CrossMarketingPerformanceGraph)
