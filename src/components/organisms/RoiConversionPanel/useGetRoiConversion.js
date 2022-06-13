import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'
import { calcBuyingIntentConversionRate, calcTotalConversionRate } from './utils'

const GET_ROI_CONVERSION_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      totalConversionData: competitors_by_campaigns {
        advClicks: adv_clicks
        impressions
      }

      buyingIntentData: engagements {
        whereToBuyClicks: where_to_buy_clicks
        buyNowClicks: buy_now_clicks
        productPageHits: product_page_hits
      }
    }
  }
`

const initialState = {
  totalConversionRate: 'N/A',
  buyingIntentConversionRate: 'N/A'
}

const useGetRoiConversion = ({ from, to, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_ROI_CONVERSION_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, gtins }) }
  })

  const [info, setInfo] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const totalConversionData = get(data, 'analytics.totalConversionData') || []
      const buyingIntentData = get(data, 'analytics.buyingIntentData') || []

      if (totalConversionData.length || buyingIntentData.length) {
        const newState = { ...initialState }

        if (totalConversionData.length)
          newState.totalConversionRate = calcTotalConversionRate(totalConversionData[0]) || 0
        if (buyingIntentData.length)
          newState.buyingIntentConversionRate = calcBuyingIntentConversionRate(buyingIntentData[0]) || 0

        setInfo({ ...newState })
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

export default useGetRoiConversion
