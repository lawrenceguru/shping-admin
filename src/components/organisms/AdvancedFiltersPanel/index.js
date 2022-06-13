import { connect } from 'react-redux'
import { indexGetIndexInfo, indexPostIndexInfo } from 'store/actions'
import FilterProductPanel from './AdvancedFiltersPanel'

export default connect(null, { indexGetIndexInfo, indexPostIndexInfo })(FilterProductPanel)
