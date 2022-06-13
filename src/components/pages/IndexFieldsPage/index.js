import { connect } from 'react-redux'
import IndexFieldsPage from './IndexFieldsPage'

const mapStateToProps = state => ({
  modules: state.identity.modules
})

export default connect(mapStateToProps, null)(IndexFieldsPage)
