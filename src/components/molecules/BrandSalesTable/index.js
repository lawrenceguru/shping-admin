import { connect } from 'react-redux'
import { analyticsGetBrandSales } from 'store/actions'
import BrandSalesTable from './BrandSalesTable'

const mapStateToProps = state => ({
  sales: state.analytics.infoSales
})

export default connect(mapStateToProps, { analyticsGetBrandSales })(BrandSalesTable)
