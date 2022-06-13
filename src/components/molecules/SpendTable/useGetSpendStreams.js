import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'
import { processSpendStreams } from './utils'

const GET_SPEND_STREAMS_QUERY = gql`
  query($from: String, $to: String, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      streamed_spends {
        id: stream

        social_link_clicks
        cross_marketing_clicks
        link_clicks
        clicks
        clicks_spend

        video_views
        video_views_spend

        reviews
        reviews_spend

        impressions
        impressions_spend

        total_spend
      }
    }
  }
`

const useGetSpendStreams = ({ from, to, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_SPEND_STREAMS_QUERY, {
    fetchPolicy: 'network-only',
    variables: { from, to, ...convertFilterParams({ brand, country, gtins }) }
  })

  const [streams, setStreams] = useState([])

  useEffect(() => {
    if (data) {
      const streamedSpends = get(data, 'analytics.streamed_spends')

      if (streamedSpends.length) {
        setStreams(processSpendStreams(streamedSpends))
      } else {
        setStreams([])
      }
    }
  }, [data])

  return {
    loading,
    streams
  }
}

export default useGetSpendStreams
