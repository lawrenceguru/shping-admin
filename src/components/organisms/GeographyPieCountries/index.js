import { connect } from 'react-redux'
import { analyticsGetCountriesTotal } from 'store/actions'
import GeographyPieStates from './GeographyPieCountries'

const mapStateToProps = state => ({
  countries: state.geography.countries,
  countriesNames: state.analytics.countries
})

export default connect(mapStateToProps,
  {
    analyticsGetCountriesTotal
  }
)(GeographyPieStates)
