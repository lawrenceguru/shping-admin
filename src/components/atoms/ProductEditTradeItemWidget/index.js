import { connect } from 'react-redux'
import {
  getGpsSegments,
  getGpsFamilies,
  getGpsClasses,
  getGpsBricks,
  getGpsAttrKeys,
  getGpsAttrValues,
  getGpsAttrsValues
} from 'store/actions'
import ProductEditTradeItemWidget from './ProductEditTradeItemWidget'

const mapStateToProps = state => ({
  products: state.products.products,
  gtinInfo: state.gtin.data,
  segments: state.gpc.segments,
  families: state.gpc.families,
  classes: state.gpc.classes,
  bricks: state.gpc.bricks,
  keys: state.gpc.keys,
  valuesFromServer: state.gpc.values,
  isLoadingGpcSegments: state.gpc.isLoadingGpcSegments,
  isLoadingGpcFamilies: state.gpc.isLoadingGpcFamilies,
  isLoadingGpcClasses: state.gpc.isLoadingGpcClasses,
  isLoadingGpcBricks: state.gpc.isLoadingGpcBricks,
  isLoadingGpcKeys: state.gpc.isLoadingGpcKeys,
  isLoadingGpcValues: state.gpc.isLoadingGpcValues
})

export default connect(mapStateToProps, {
  getGpsSegments,
  getGpsFamilies,
  getGpsClasses,
  getGpsBricks,
  getGpsAttrKeys,
  getGpsAttrValues,
  getGpsAttrsValues
})(ProductEditTradeItemWidget)
