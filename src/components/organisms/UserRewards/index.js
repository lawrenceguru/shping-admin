import { connect } from 'react-redux'
import { usersGetUserRewards } from 'store/actions'
import UserRewards from './UserRewards'

const mapStateToProps = state => ({
  isLoadingRewards: state.users.isLoadingRewards,
  rewards: state.users.rewards,
  count: state.users.countRewards
})

export default connect(mapStateToProps, { usersGetUserRewards })(UserRewards)
