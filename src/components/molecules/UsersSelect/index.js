import { connect } from 'react-redux'
import { myTeamGetMyTeam } from 'store/actions'
import UsersSelect from './UsersSelect'

const mapStateToProps = state => ({
  team: state.myTeam.team,
  isLoadingTeam: state.myTeam.isLoadingTeam
})

export default connect(mapStateToProps, { myTeamGetMyTeam })(UsersSelect)
