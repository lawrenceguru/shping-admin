import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

const CASHBACK_SPENDS = gql`
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
      cashback_spends {
        campaign_id
        cashback_passthrough
      }
      campaign_id
    }
  }
`

const useCashbackSpends = ({ from, to, brand, gtins, country, campaignId, groupBy }) => {
  const { data, loading } = useQuery(CASHBACK_SPENDS, {
    variables: { from, to, brand, gtins, country, campaignId, groupBy }
  })
  const [cashbackSpends, setCashbackSpends] = useState([])

  useEffect(() => {
    if (data) {
      const cashback = get(data, 'analytics.cashback_spends') || []
      if (cashback.length) {
        setCashbackSpends(cashback)
      } else {
        setCashbackSpends([])
      }
    }
  }, [data])

  return {
    loading,
    cashbackSpends
  }
}

export default useCashbackSpends
