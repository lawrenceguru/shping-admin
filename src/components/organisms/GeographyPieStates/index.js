import { connect } from 'react-redux'
import { analyticsGetStates } from 'store/actions'
import GeographyPieStates from './GeographyPieStates'

const mapStateToProps = state => ({
  states: state.geography.states
})

export default connect(mapStateToProps,
  {
    analyticsGetStates
  }
)(GeographyPieStates)
