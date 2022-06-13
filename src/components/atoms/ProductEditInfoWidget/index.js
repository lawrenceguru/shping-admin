import { connect } from 'react-redux'
import { getGtin } from 'store/actions'
import ProductEditInfoWidget from './ProductEditInfoWidget'

export default connect(null, { getGtin })(ProductEditInfoWidget)
