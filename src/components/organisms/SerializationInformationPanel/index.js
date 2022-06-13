import { connect } from 'react-redux'
import {
  serializationGetCreatedProducts,
  serializationGetIntoCirculationProducts,
  serializationGetShippedProducts
} from 'store/actions'
import SerializationInformationPanel from './SerializationInformationPanel'

const mapStateToProps = state => ({
  createdTotal: state.serializationAnalytics.createdTotal,
  intoCirculationTotal: state.serializationAnalytics.intoCirculationTotal,
  shippedTotal: state.serializationAnalytics.shippedTotal
})

export default connect(mapStateToProps, {
  serializationGetCreatedProducts,
  serializationGetIntoCirculationProducts,
  serializationGetShippedProducts
})(SerializationInformationPanel)
