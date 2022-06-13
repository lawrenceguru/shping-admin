import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

const STREAMED_SPENDS = gql`
  query Query(
    $from: String
    $to: String
    $aggregation: Aggregation
    $brand: String
    $gtins: [String!]
    $country: String
    $campaignId: [String!]
    $groupBy: [String!]
  ) {
    analytics(
      from: $from
      to: $to
      aggregation: $aggregation
      brand: $brand
      gtins: $gtins
      country: $country
      campaign_id: $campaignId
      group_by: $groupBy
    ) {
      streamed_spends {
        year
        month
        week
        day
        brand
        country
        stream
        gtin
        social_link_clicks
        cross_marketing_clicks
        clicks
        clicks_spend
        link_clicks
        video_views
        video_views_spend
        reviews
        reviews_spend
        activations
        activations_spend
        impressions_spend
        impressions
        total_spend
        user_id
        campaign_id
        cashback_handle_fee
        cashback_passthrough
        cashback_transaction_fee
      }
      campaign_id
    }
  }
`

const useStreamedSpends = ({ from, to, brand, gtins, country, campaignId, groupBy }) => {
  const { data, loading } = useQuery(STREAMED_SPENDS, {
    variables: { from, to, brand, gtins, country, campaignId, groupBy }
  })
  const [streamedSpends, setStreamedSpends] = useState({})

  useEffect(() => {
    if (data) {
      const streamed = get(data, 'data.analytics.streamed_spends') || []
      if (streamed.length) {
        setStreamedSpends(streamed[0])
      } else {
        setStreamedSpends({})
      }
    }
  }, [data])

  return {
    loading,
    streamedSpends
  }
}

export default useStreamedSpends
