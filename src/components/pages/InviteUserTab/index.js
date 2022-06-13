import { connect } from 'react-redux'
import { inviteUser, myTeamGetMyTeam } from 'store/actions'
import InviteUserTab from './InviteUserTab'

const mapStateToProps = state => ({
  isLoading: state.inviteUser.isLoading,
  identity: state.identity
})

export default connect(mapStateToProps, { inviteUser, myTeamGetMyTeam })(InviteUserTab)
