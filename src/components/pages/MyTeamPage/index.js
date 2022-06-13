import { connect } from 'react-redux'
import {
  myTeamGetMyTeam,
  myTeamPostNotificationOn,
  myTeamPostNotificationOff,
  myTeamPostLevel,
  myTeamDeleteTeammate,
  myTeamClearLevel,
  myTeamSetContext,
  myTeamGetContext
} from 'store/actions'

import MyTeamPage from './MyTeamPage'

const mapStateToProps = state => ({
  isLoadingTeam: state.myTeam.isLoadingTeam,
  team: state.myTeam.team,
  isNotificationChanging: state.myTeam.isNotificationChanging,
  currentParticipant: state.identity.current_participant,
  postLevel: state.myTeam.postLevel,
  isTeammateDeleting: state.myTeam.isTeammateDeleting,
  isChangingParticipant: state.identity.isChangingParticipant,
  identity: state.identity,
  isChangingContext: state.myTeam.isChangingContext,
  context: state.myTeam.context
})

export default connect(mapStateToProps, {
  myTeamGetMyTeam,
  myTeamPostNotificationOn,
  myTeamPostNotificationOff,
  myTeamPostLevel,
  myTeamDeleteTeammate,
  myTeamClearLevel,
  myTeamSetContext,
  myTeamGetContext
})(MyTeamPage)
