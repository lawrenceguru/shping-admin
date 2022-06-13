import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import intl from 'react-intl-universal'
import { convertFilterParams } from '../../../utils/analytics'

const CampaignFieldsMap = {
  link_clicks: intl.get('overviewPage.campaigns.link_clicks'),
  social_link_clicks: intl.get('overviewPage.campaigns.social_link_clicks'),
  cross_marketing_clicks: intl.get('overviewPage.campaigns.cross_marketing_clicks'),
  reviews: intl.get('overviewPage.campaigns.reviews'),
  video_views: intl.get('overviewPage.campaigns.video_views'),
  activations: intl.get('overviewPage.campaigns.activations'),
  impressions: intl.get('overviewPage.campaigns.impressions'),
  timeline_impressions: intl.get('overviewPage.campaigns.impressions'),
  cross_marketing_impressions: intl.get('overviewPage.campaigns.impressions')
}

/**
 * Restructures campaigns data into a format for the chart.
 * Merges campaign fields according to `CampaignFieldsMap`
 */
const processCampaignsData = data => {
  return Object.entries(data).reduce((acc, [action, value]) => {
    const actionName = CampaignFieldsMap[action]

    if (value && actionName) {
      const mergableField = acc.find(field => field.name === actionName)
      if (mergableField) {
        mergableField.aud += value
      } else {
        acc.push({
          action,
          aud: value,
          name: actionName
        })
      }
    }

    return acc
  }, [])
}

const GET_CAMPAIGNS_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $aggregation: Aggregation!) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, aggregation: $aggregation) {
      engagements {
        link_clicks
        social_link_clicks
        cross_marketing_clicks
        reviews
        video_views
        activations
        impressions
        timeline_impressions
        cross_marketing_impressions
      }
    }
  }
`

const useGetCampaigns = ({ from, to, brand, country, aggregation }) => {
  const { data, loading } = useQuery(GET_CAMPAIGNS_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation }) }
  })

  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    if (data) {
      const campaignsData = get(data, 'analytics.engagements') || []

      if (campaignsData.length) {
        setCampaigns(processCampaignsData(campaignsData[0]))
      } else {
        setCampaigns([])
      }
    }
  }, [data])

  return {
    loading,
    campaigns
  }
}

export default useGetCampaigns
