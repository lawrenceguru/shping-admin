import { connect } from 'react-redux'
import { analyticsGetSales } from 'store/actions'
import ConversionSales from './ConversionSales'

const mapStateToProps = state => ({
  sales: state.conversion.sales
})

export default connect(mapStateToProps, { analyticsGetSales })(ConversionSales)
