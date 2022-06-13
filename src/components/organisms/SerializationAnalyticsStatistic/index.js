import { connect } from 'react-redux'
import { serializationGetProductsStatistic } from 'store/actions'
import SerializationAnalyticsStatistic from './SerializationAnalyticsStatistic'

const mapStateToProps = state => ({
  statistic: state.serializationAnalytics.statistic,
  dateAs: state.serializationAnalyticsFilters.dateAs
})

export default connect(mapStateToProps, { serializationGetProductsStatistic })(SerializationAnalyticsStatistic)
