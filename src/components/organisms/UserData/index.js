import { connect } from 'react-redux'
import { usersSetBlockStatus, usersSetRewardsBan, usersSendTimelineMessage } from 'store/actions'
import UserData from './UserData'

export default connect(null, {
  usersSetBlockStatus,
  usersSetRewardsBan,
  usersSendTimelineMessage
})(UserData)
