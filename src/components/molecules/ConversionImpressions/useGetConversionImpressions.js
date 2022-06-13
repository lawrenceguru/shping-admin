import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const IMPRESSIONS_MAP = {
  product_page_impressions: 'product',
  timeline_impressions: 'timeline',
  cross_marketing_impressions: 'cross_market_link'
}

const GET_CONVERSION_IMPRESSIONS = gql`
  query($from: String, $to: String, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      engagements {
        product_page_impressions
        timeline_impressions
        cross_marketing_impressions
      }
    }
  }
`

const useGetConversionImpressions = ({ from, to, ...filterParams }) => {
  const { data, loading } = useQuery(GET_CONVERSION_IMPRESSIONS, {
    variables: { from, to, ...convertFilterParams(filterParams) }
  })

  const [impressions, setImpressions] = useState([])

  useEffect(() => {
    if (data) {
      const impressionsRecord = get(data, 'analytics.engagements') || []

      if (impressionsRecord.length) {
        const impressionsData = Object.entries(impressionsRecord[0]).reduce((acc, [action, value]) => {
          if (IMPRESSIONS_MAP[action]) {
            acc.push({ action: IMPRESSIONS_MAP[action], num_impressions: value })
          }
          return acc
        }, [])

        setImpressions(impressionsData)
      } else {
        setImpressions([])
      }
    }
  }, [data])

  return {
    loading,
    impressions
  }
}

export default useGetConversionImpressions
