import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_BUYING_INTENT_ROI_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      engagements {
        sales: potential_sales
        spend: total_spend
      }
    }
  }
`

const initialState = {
  sales: 0,
  spend: 0,
  potentialRoi: ''
}

const useGetRoiBuyingIntent = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_BUYING_INTENT_ROI_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [buyingIntentData, setBuyingIntentData] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const engagements = get(data, 'analytics.engagements') || []

      if (engagements.length) {
        const { sales, spend } = engagements[0]

        setBuyingIntentData({
          spend: spend.toFixed(),
          sales: sales.toFixed(),
          potentialRoi: spend > 0 ? `x ${(sales / spend).toFixed(1)}` : 'N/A'
        })
      } else {
        setBuyingIntentData({ ...initialState })
      }
    }
  }, [data])

  return {
    loading,
    ...buyingIntentData
  }
}

export default useGetRoiBuyingIntent
