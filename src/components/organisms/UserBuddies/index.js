import { connect } from 'react-redux'
import { usersGetUsersBuddies } from 'store/actions'
import UserBuddies from './UserBuddies'

const mapStateToProps = state => ({
  isLoadingbuddies: state.users.isLoadingbuddies,
  buddies: state.users.buddies
})

export default connect(mapStateToProps, { usersGetUsersBuddies })(UserBuddies)
