import { connect } from 'react-redux'
import { getGdtiCompleteLike, getGdtiInfo } from 'store/actions'
import ProductEditGdtiWidget from './ProductEditGdtiWidget'

const mapStateToProps = state => ({
  completeGdtiList: state.products.completeGdtiList,
  completeListGdtiIsLoading: state.products.completeListGdtiIsLoading,
  gdtiInfo: state.products.gdtiInfo,
  isLoadingGdtiInfo: state.products.isLoadingGdtiInfo
})

export default connect(mapStateToProps, { getGdtiCompleteLike, getGdtiInfo })(ProductEditGdtiWidget)
