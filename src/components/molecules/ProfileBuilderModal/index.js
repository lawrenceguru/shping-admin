import { connect } from 'react-redux'
import { postUploadClear } from 'store/actions'
import ProfileBuilderModal from './ProfileBuilderModal'

export default connect(null, { postUploadClear })(ProfileBuilderModal)
