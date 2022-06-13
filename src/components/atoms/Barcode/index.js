import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Barcode from './Barcode'

const mapStateToProps = () => ({})

export default withRouter(connect(mapStateToProps)(Barcode))
