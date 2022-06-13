import { connect } from 'react-redux'
import {
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
} from 'store/actions'
import ModalImageForm from './ModalImageForm'

const mapStateToProps = state => ({
  list: state.imageWidget.list,
  details: state.imageWidget.details
})

export default connect(mapStateToProps, {
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
})(ModalImageForm)
