import { connect } from 'react-redux'
import {
  filterAnalyticsSetSelectRange,
  filterAnalyticsSetSelectCountry,
  filterAnalyticsSetSelectBrand,
  analyticsGetCountries,
  indexFieldsProductsGetBrands,
  filterAnalyticsSetCity,
  filterAnalyticsGetRangesDates,
  filterAnalyticsSetSelectGtin,
  filterAnalyticsSetPostcode,
  filterAnalyticsSetState,
  getProductCompleteLike
} from 'store/actions'
import FilterPanel from './filterPanel'

const mapStateToProps = state => ({
  selectRange: state.filterAnalytics.selectRange,
  selectCountry: state.filterAnalytics.selectCountry,
  selectFirstDate: state.filterAnalytics.selectFirstDate,
  selectGtin: state.filterAnalytics.selectGtin,
  selectSecondDate: state.filterAnalytics.selectSecondDate,
  selectBrand: state.filterAnalytics.selectBrand,
  selectCity: state.filterAnalytics.selectCity,
  selectState: state.filterAnalytics.selectState,
  selectPostcode: state.filterAnalytics.selectPostcode,
  countries: state.analytics.countries,
  brands: state.indexFieldsProducts.brands,
  completeList: state.products.completeList,
  completeListIsLoading: state.products.completeListIsLoading
})

export default connect(mapStateToProps, {
  filterAnalyticsSetSelectRange,
  filterAnalyticsSetSelectCountry,
  analyticsGetCountries,
  indexFieldsProductsGetBrands,
  filterAnalyticsSetSelectBrand,
  filterAnalyticsSetCity,
  filterAnalyticsGetRangesDates,
  filterAnalyticsSetSelectGtin,
  filterAnalyticsSetPostcode,
  filterAnalyticsSetState,
  getProductCompleteLike
})(FilterPanel)
