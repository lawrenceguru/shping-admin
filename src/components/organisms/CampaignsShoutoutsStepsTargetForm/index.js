import { connect } from 'react-redux'
import { settingsGetCountries } from 'store/actions'
import CampaignShoutoutsStepsTargetForm from './CampaignsShoutoutsStepsTargetForm'

const mapStateToProps = state => ({
  countries: state.settings.countries,
  isLoadingCountries: state.settings.isLoadingCountries
})

export default connect(mapStateToProps, { settingsGetCountries })(CampaignShoutoutsStepsTargetForm)
