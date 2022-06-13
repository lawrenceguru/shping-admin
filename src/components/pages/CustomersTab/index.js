import { connect } from 'react-redux'
import {
  customerRemoveParticipant,
  customerGetAll,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerDeleteData
} from 'store/actions'
import CustomersTab from './CustomersTab'

const mapStateToProps = state => ({
  customerIsLoading: state.customer.customerIsLoading,
  customerList: state.customer.customerList,
  customerCount: state.customer.customerCount,
  isUpdating: state.customer.isUpdating,
  filters: state.customer.filters
})

export default connect(mapStateToProps, {
  customerRemoveParticipant,
  customerGetAll,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerDeleteData
})(CustomersTab)
