import { connect } from 'react-redux'
import { analyticsGetClicks } from 'store/actions'
import ConversionClicks from './ConversionClicks'

const mapStateToProps = state => ({
  clicks: state.conversion.clicks,
  isRangeTooBig: state.conversion.isRangeTooBig,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  realRequestFirstDate: state.conversion.realRequestFirstDate
})

export default connect(mapStateToProps, { analyticsGetClicks })(ConversionClicks)
