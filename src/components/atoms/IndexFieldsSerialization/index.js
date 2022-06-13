import { connect } from 'react-redux'
import { indexFieldsSerializationGetIndexInfo, indexFieldsSerializationPostIndexInfo } from 'store/actions'
import IndexFieldsSerialization from './IndexFieldsSerialization'

const mapStateToProps = state => ({
  customIndexFields: state.indexFieldsSerialization.customIndexFields,
  prevIndexFields: state.indexFieldsSerialization.prevIndexFields,
  defaultIndexFields: state.indexFieldsSerialization.defaultIndexFields,
  isLoadingIndexInfo: state.indexFieldsSerialization.isLoadingIndexInfo
})

export default connect(mapStateToProps, {
  indexFieldsSerializationGetIndexInfo,
  indexFieldsSerializationPostIndexInfo
})(IndexFieldsSerialization)
