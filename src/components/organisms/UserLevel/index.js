import { connect } from 'react-redux'
import { usersGetUserLevelInfo } from 'store/actions'
import UserLevel from './UserLevel'

const mapStateToProps = state => ({
  isLoadingUserLevels: state.users.isLoadingUserLevels,
  userLevels: state.users.userLevels
})

export default connect(mapStateToProps, { usersGetUserLevelInfo })(UserLevel)
