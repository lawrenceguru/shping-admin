import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_OVERVIEW_ENGAGEMENT_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $aggregation: Aggregation!) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, aggregation: $aggregation) {
      engagements {
        interactions
        impressions
        clicks
        scans

        day
        week
        month
        year
      }
    }
  }
`

const initialState = {
  scans: [],
  clicks: [],
  impressions: [],
  interactions: []
}

const useGetOverviewEngagement = ({ from, to, brand, country, aggregation }) => {
  const { data, loading } = useQuery(GET_OVERVIEW_ENGAGEMENT_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation }) }
  })

  const [infoData, setInfoData] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const engagements = get(data, 'analytics.engagements') || []
      if (engagements.length) {
        setInfoData({
          interactions: engagements.map(el => el.interactions),
          impressions: engagements.map(el => el.impressions),
          clicks: engagements.map(el => el.clicks),
          scans: engagements.map(el => el.scans),
          dates: engagements.map(({ day, week, month, year }) => {
            return { day, week, month, year }
          })
        })
      } else {
        setInfoData({ ...initialState })
      }
    }
  }, [data])

  return {
    loading,
    ...infoData
  }
}

export default useGetOverviewEngagement
