import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const SOCIALS_MAP = {
  website_clicks: 'Website',
  facebook_clicks: 'Facebook',
  twiter_clicks: 'Twitter',
  instagram_clicks: 'Instagram',
  tiktok_clicks: 'TikTok',
  youtube_clicks: 'YouTube'
}

const GET_CONVERSION_COMMUNITY_GROWTH_INTERACTIONS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      communityGrowth: engagements {
        website_clicks
        facebook_clicks
        twiter_clicks
        instagram_clicks
        tiktok_clicks
        youtube_clicks
      }
    }
  }
`

const initialState = Object.values(SOCIALS_MAP).reduce((acc, action) => {
  acc.push({ action, interactions: 0 })
  return acc
}, [])

const useGetConversionClicks = ({ from, to, ...filterParams }) => {
  const { data, loading } = useQuery(GET_CONVERSION_COMMUNITY_GROWTH_INTERACTIONS, {
    variables: { from, to, ...convertFilterParams(filterParams) }
  })

  const [interactions, setInteractions] = useState(initialState)

  useEffect(() => {
    if (data) {
      const interactionsRes = get(data, 'analytics.communityGrowth') || []

      if (interactionsRes.length) {
        const socialInteractions = Object.entries(interactionsRes[0]).reduce((acc, [action, value]) => {
          if (SOCIALS_MAP[action]) {
            acc.push({ action: SOCIALS_MAP[action], interactions: value })
          }
          return acc
        }, [])

        setInteractions(socialInteractions)
      } else {
        setInteractions(initialState)
      }
    }
  }, [data])

  return {
    loading,
    interactions
  }
}

export default useGetConversionClicks
