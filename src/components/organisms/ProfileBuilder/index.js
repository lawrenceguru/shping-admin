import { connect } from 'react-redux'
import { getGtin, postUploadClear } from 'store/actions'
import ProfileBuilder from './ProfileBuilder'

const mapStateToProps = state => ({
  isTryUpdateGtin: state.gtin.isTryUpdateGtin
})

export default connect(mapStateToProps, { getGtin, postUploadClear })(ProfileBuilder)
