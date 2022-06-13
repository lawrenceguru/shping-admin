import { connect } from 'react-redux'
import { usersGetUsersList, usersGetBlockedStatus, usersGetBanHistory, usersClearUserInfo } from 'store/actions'
import UserInfo from './UserInfo'

const mapStateToProps = state => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
  isUserBlocked: state.users.isUserBlocked,
  banHistory: state.users.banHistory
})

export default connect(mapStateToProps, {
  usersGetUsersList,
  usersGetBlockedStatus,
  usersGetBanHistory,
  usersClearUserInfo
})(UserInfo)
