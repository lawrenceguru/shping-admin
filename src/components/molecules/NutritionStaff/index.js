import { connect } from 'react-redux'
import { getGdtiNutritions } from 'store/actions'
import NutritionStaff from './NutritionStaff'

const mapStateToProps = state => ({
  nutritions: state.gdti.nutritions,
  isLoadingGdtiNutritions: state.gdti.isLoadingGdtiNutritions
})

export default connect(mapStateToProps, { getGdtiNutritions })(NutritionStaff)
