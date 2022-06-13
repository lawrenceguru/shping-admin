import { connect } from 'react-redux'
import {
  serializationFilterAnalyticsSetRangeDates,
  serializationFilterAnalyticsGetSelectCustomer,
  serializationFilterAnalyticsSetSelectRange,
  myTeamGetContext
} from 'store/actions'
import SerializationFilterPanel from './SerializationFilterPanel'

const mapStateToProps = state => ({
  dateAs: state.serializationAnalyticsFilters.dateAs,
  fromDate: state.serializationAnalyticsFilters.fromDate,
  toDate: state.serializationAnalyticsFilters.toDate,
  issuer: state.serializationAnalyticsFilters.issuer,
  context: state.myTeam.context
})

export default connect(mapStateToProps, {
  serializationFilterAnalyticsSetRangeDates,
  serializationFilterAnalyticsGetSelectCustomer,
  serializationFilterAnalyticsSetSelectRange,
  myTeamGetContext
})(SerializationFilterPanel)
