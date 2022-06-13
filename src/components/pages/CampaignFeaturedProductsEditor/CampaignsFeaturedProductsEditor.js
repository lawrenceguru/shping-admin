import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import CampaignEditor from '../../organisms/CampaignEditor'
import { getDataFromRequestForFeaturedCampaign, generateRequestForFeaturedCampaign } from '../../../utils/campaign'
import CampaignsFeaturedSummary from '../../organisms/CampaignsFeaturedSummary'
import { stepperCampaignFeatured } from '../../../utils/steps'

const initialValues = {
  name: '',
  dates: [],
  run_time: null,
  status: 'inactive',
  options: false,
  audience: {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: [],
    user_level: []
  },
  hero_image_url: null,
  products: []
}

const CampaignsFeaturedProductsEditor = ({
  campaignsFeaturedPostCampaignFeatured,
  campaignsFeaturedPutCampaignFeatured,
  isLoading,
  updated,
  featuredList
}) => {
  return (
    <CampaignEditor
      isLoading={isLoading}
      updated={updated}
      campaigns={featuredList}
      postCampaign={campaignsFeaturedPostCampaignFeatured}
      putCampaign={campaignsFeaturedPutCampaignFeatured}
      initialValues={initialValues}
      Summary={CampaignsFeaturedSummary}
      steps={stepperCampaignFeatured}
      redirectLink='/admin/campaigns/featured'
      generateRequest={generateRequestForFeaturedCampaign}
      getDataFromCampaign={getDataFromRequestForFeaturedCampaign}
      formObjectFields={[]}
    />
  )
}

CampaignsFeaturedProductsEditor.propTypes = {
  campaignsFeaturedPostCampaignFeatured: PropTypes.func.isRequired,
  campaignsFeaturedPutCampaignFeatured: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  updated: PropTypes.bool,
  featuredList: PropTypes.arrayOf(PropTypes.object)
}

CampaignsFeaturedProductsEditor.defaultProps = {
  isLoading: false,
  updated: false,
  featuredList: null
}

export default withRouter(CampaignsFeaturedProductsEditor)
