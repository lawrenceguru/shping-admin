import { connect } from 'react-redux'
import { analyticsGetRetailers } from 'store/actions'
import AudiencePieRetailers from './AudiencePieRetailers'

const mapStateToProps = state => ({
  retailers: state.audience.retailers
})

export default connect(mapStateToProps, { analyticsGetRetailers })(AudiencePieRetailers)
