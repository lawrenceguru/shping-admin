import { connect } from 'react-redux'
import { analyticsGetCoordinates } from 'store/actions'
import GeographyGraphPanel from './GeographyGraphPanel'

const mapStateToProps = state => ({
  countries: state.analytics.countries,
  coordinates: state.geography.coordinates,
  selectCountry: state.filterAnalytics.selectCountry
})

export default connect(mapStateToProps, { analyticsGetCoordinates })(GeographyGraphPanel)
