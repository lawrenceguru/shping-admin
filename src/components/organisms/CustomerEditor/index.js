import { connect } from 'react-redux'
import {
  customerGetCustomerInfo,
  settingsGetCountries,
  settingsGetTimezone,
  customerClearCustomerInfo,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerSetTimezone,
  customerSetRewardsFee,
  customerSetBudget,
  customerSetCustomerFlags
} from 'store/actions'
import CustomerEditor from './CustomerEditor'

const mapStateToProps = state => ({
  customerInfo: state.customer.customerInfo,
  filters: state.customer.filters,
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries,
  timezones: state.settings.timezones,
  isSuccessRemoving: state.customer.isSuccessRemoving
})

export default connect(mapStateToProps, {
  customerGetCustomerInfo,
  settingsGetCountries,
  settingsGetTimezone,
  customerClearCustomerInfo,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerSetTimezone,
  customerSetRewardsFee,
  customerSetBudget,
  customerSetCustomerFlags
})(CustomerEditor)
