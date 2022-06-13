import { connect } from 'react-redux'
import {
  getGtin,
  indexFieldsProductsGetBrands,
  updateGtin,
  participantGetParticipantProfile,
  descriptionUpdateSources,
  clearGtinInfo,
  startUpdateGtin,
  endUpdateGtin
} from 'store/actions'
import ProductWidgets from './ProductWidgets'

const mapStateToProps = state => ({
  gtinInfo: state.gtin.data,
  isLoadingGtinInfo: state.gtin.isLoadingGtin,
  isUpdatingGtinInfo: state.gtin.isUpdatingGtinInfo,
  updated: state.gtin.updated,
  brands: state.indexFieldsProducts.brands,
  currentParticipant: state.identity.current_participant,
  participants: state.identity.participants,
  isLoadingGpcSegments: state.gpc.isLoadingGpcSegments,
  participant: state.participant,
  isUpdatingSources: state.description.isUpdatingSources
})

export default connect(mapStateToProps, {
  getGtin,
  updateGtin,
  indexFieldsProductsGetBrands,
  participantGetParticipantProfile,
  descriptionUpdateSources,
  clearGtinInfo,
  startUpdateGtin,
  endUpdateGtin
})(ProductWidgets)
