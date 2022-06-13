import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_SPENDS_QUERY = gql`
  query($from: String, $to: String, $aggregation: Aggregation, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, aggregation: $aggregation, country: $country, brand: $brand, gtins: $gtins) {
      spends: all_spends {
        video_views_spend
        impressions_spend
        clicks_spend
        reviews_spend

        day
        week
        month
        year
      }
    }
  }
`
const initialState = {
  reviews: [],
  videoViews: [],
  interactions: [],
  impressions: []
}

const useGetSpends = ({ from, to, aggregation, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_SPENDS_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation, gtins }) }
  })

  const [info, setInfo] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const spends = get(data, 'analytics.spends')

      if (spends.length) {
        setInfo({
          interactions: spends.map(el => el.clicks_spend),
          impressions: spends.map(el => el.impressions_spend),
          reviews: spends.map(el => el.reviews_spend),
          videoViews: spends.map(el => el.video_views_spend),
          dates: spends.map(({ day, week, month, year }) => {
            return { day, week, month, year }
          })
        })
      } else {
        setInfo({ ...initialState })
      }
    }
  }, [data])

  return {
    loading,
    ...info
  }
}

export default useGetSpends
