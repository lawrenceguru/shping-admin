import React from 'react'
import PropTypes from 'prop-types'
import CampaignSummary from '../CampaignSummary'
import { options } from './consts'

const CampaignFeaturedSummary = ({ values }) => {
  return <CampaignSummary values={values} sectionsOptions={options} />
}

CampaignFeaturedSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

CampaignFeaturedSummary.defaultProps = {
  values: null
}

export default CampaignFeaturedSummary
