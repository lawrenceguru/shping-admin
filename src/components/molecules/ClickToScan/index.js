import { connect } from 'react-redux'
import { getCodeLink, createCodeLink, removeCodeLink } from 'store/actions'
import ClickToScan from './ClickToScan'

const mapStateToProps = state => ({
  lists: state.clickToScan.lists,
  totalCounts: state.clickToScan.totalCounts,
  offset: state.clickToScan.offset,
  limit: state.clickToScan.limit
})

export default connect(mapStateToProps, { getCodeLink, createCodeLink, removeCodeLink })(ClickToScan)
