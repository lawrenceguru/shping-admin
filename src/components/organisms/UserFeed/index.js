import { connect } from 'react-redux'
import { usersGetUserFeed } from 'store/actions'
import UserFeed from './UserFeed'

const mapStateToProps = state => ({
  isLoadingFeed: state.users.isLoadingFeed,
  feed: state.users.feed
})

export default connect(mapStateToProps, { usersGetUserFeed })(UserFeed)
