import { connect } from 'react-redux'
import { customerRemoveParticipant, customerDeleteData } from 'store/actions'
import CustomerCard from './CustomerCard'

const mapStateToProps = state => ({
  customerInfoIsLoading: state.customer.customerInfoIsLoading,
  isUpdating: state.customer.isUpdating
})

export default connect(mapStateToProps, { customerRemoveParticipant, customerDeleteData })(CustomerCard)
