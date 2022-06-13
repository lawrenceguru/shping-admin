import { connect } from 'react-redux'
import { identityPutAccount } from 'store/actions'
import ProfilePassword from './ProfilePassword'

const mapStateToProps = state => ({
  passwordUpdate: state.identity.passwordUpdate
})

export default connect(mapStateToProps, { identityPutAccount })(ProfilePassword)
