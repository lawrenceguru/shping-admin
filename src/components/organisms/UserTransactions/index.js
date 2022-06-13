import { connect } from 'react-redux'
import { usersGetUserTransactions, usersPutUserTransaction, settingsGetCountries } from 'store/actions'
import UserTransactions from './UserTransactions'

const mapStateToProps = state => ({
  isLoadingTransactions: state.users.isLoadingTransactions,
  transactions: state.users.transactions,
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries
})

export default connect(mapStateToProps, { usersGetUserTransactions, usersPutUserTransaction, settingsGetCountries })(
  UserTransactions
)
