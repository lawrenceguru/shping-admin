import { connect } from 'react-redux'
import { createUser, myTeamGetMyTeam, myTeamGetContext } from 'store/actions'
import CreateUserTab from './CreateUserTab'

const mapStateToProps = state => ({
  isLoading: state.createUser.isLoading,
  identity: state.identity,
  context: state.myTeam.context
})

export default connect(mapStateToProps, { createUser, myTeamGetMyTeam, myTeamGetContext })(CreateUserTab)
