import { connect } from 'react-redux'
import {
  customerSetConstraints,
  customerGetConstraints,
  customerAddConstraints,
  customerDeleteConstraints
} from 'store/actions'
import ConstrainsForm from './ConstrainsForm'

const mapStateToProps = state => ({
  constraints: state.customer.constraints,
  isLoadingConstraints: state.customer.isLoadingConstraints,
  isUpdatingConstraints: state.customer.isUpdatingConstraints
})

export default connect(mapStateToProps, {
  customerSetConstraints,
  customerGetConstraints,
  customerDeleteConstraints,
  customerAddConstraints
})(ConstrainsForm)
