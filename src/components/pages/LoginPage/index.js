import { connect } from 'react-redux'
import { identityGetSession } from 'store/actions'
import LoginPage from './LoginPage'

export default connect(null, { identityGetSession })(LoginPage)
