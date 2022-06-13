import { connect } from 'react-redux'
import { fromIdentity } from 'store/selectors'
import {
  customerGetPortfolios,
  customerAddPortfolio,
  customerEditPortfolio,
  customerDeletePortfolio
} from 'store/actions'
import PortfoliosList from './PortfoliosList'

const mapStateToProps = state => ({
  portfolios: state.customer.portfolios,
  isLoadingPortfolios: state.customer.isLoadingPortfolios,
  isUpdatingPortfolios: state.customer.isUpdatingPortfolios,
  isSystem: fromIdentity.isSystem(state)
})

export default connect(mapStateToProps, {
  customerGetPortfolios,
  customerAddPortfolio,
  customerEditPortfolio,
  customerDeletePortfolio
})(PortfoliosList)
