import { connect } from 'react-redux'
import { cashoutSetSettings, cashoutGetSettings } from 'store/actions'
import CashoutParametersPage from './CashoutParametersPage'

const mapStateToProps = state => ({
  isLoading: state.cashout.isLoading,
  settings: state.cashout.settings
})

export default connect(mapStateToProps, { cashoutSetSettings, cashoutGetSettings })(CashoutParametersPage)
