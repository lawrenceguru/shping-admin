import { connect } from 'react-redux'
import { usersGetContributorLevelInfo } from 'store/actions'
import UserContributionLevel from './UserContributionLevel'

const mapStateToProps = state => ({
  isLoadingContributorLevel: state.users.isLoadingContributorLevel,
  contributorLevel: state.users.contributorLevel
})

export default connect(mapStateToProps, { usersGetContributorLevelInfo })(UserContributionLevel)
