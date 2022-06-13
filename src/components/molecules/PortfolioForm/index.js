import { connect } from 'react-redux'
import { customerGetPortfolio, customerClearActivePortfolio } from 'store/actions'
import PortfolioForm from './PortfolioForm'

const mapStateToProps = state => ({
  brands: state.customer.brands,
  portfolio: state.customer.activePortfolio,
  isLoadingPortfolio: state.customer.isLoadingPortfolio
})

export default connect(mapStateToProps, { customerGetPortfolio, customerClearActivePortfolio })(PortfolioForm)
