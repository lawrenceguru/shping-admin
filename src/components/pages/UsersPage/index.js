import { connect } from 'react-redux'
import { usersGetUsersList } from 'store/actions'
import UsersPage from './UsersPage'

const mapStateToProps = state => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
  count: state.users.count,
  filters: state.users.filters
})

export default connect(mapStateToProps, { usersGetUsersList })(UsersPage)
