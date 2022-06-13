import { connect } from 'react-redux'
import CustomerInfo from './CustomerInfo'

const mapStateToProps = state => ({
  customerList: state.customer.customerList
})

export default connect(mapStateToProps, null)(CustomerInfo)
