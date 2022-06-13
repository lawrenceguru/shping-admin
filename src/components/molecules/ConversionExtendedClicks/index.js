import { connect } from 'react-redux'
import { analyticsGetClicks } from 'store/actions'
import ConversionExtendedClicks from './ConversionExtendedClicks'

const mapStateToProps = state => ({
  clicks: state.conversion.clicks,
  selectRange: state.filterAnalytics.selectRange
})

export default connect(mapStateToProps, { analyticsGetClicks })(ConversionExtendedClicks)
