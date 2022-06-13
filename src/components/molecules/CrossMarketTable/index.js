import { connect } from 'react-redux'
import { filterAnalyticSetAdsMode } from 'store/actions'
import CrossMarketTable from './CrossMarketTable'

const mapStateToProps = state => ({
  filters: state.filterAnalytics
})

export default connect(mapStateToProps, { filterAnalyticSetAdsMode })(CrossMarketTable)
