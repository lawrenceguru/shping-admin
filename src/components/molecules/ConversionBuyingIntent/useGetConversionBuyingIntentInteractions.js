import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const BUYING_INTENT_MAP = {
  buy_now_clicks: 'Buy Now',
  where_to_buy_clicks: 'Where to Buy' // ,
  // add_to_shopping_list: 'Add to Shopping List',
  // receipt_sales: 'Receipt Sales'
}

const GET_BUYING_INTENT_CLICKS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      buyingIntent: engagements {
        buy_now_clicks
        where_to_buy_clicks
        add_to_shopping_list
        receipt_sales
      }
    }
  }
`

const initialState = Object.values(BUYING_INTENT_MAP).reduce((acc, action) => {
  acc.push({ action, interactions: 0 })
  return acc
}, [])

const useGetConversionBuyingIntentInteractions = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_BUYING_INTENT_CLICKS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [interactions, setInteractions] = useState(initialState)

  useEffect(() => {
    if (data) {
      const buyingIntentClicks = get(data, 'analytics.buyingIntent') || []

      if (buyingIntentClicks.length) {
        const buyingIntentInteractions = Object.entries(buyingIntentClicks[0]).reduce((acc, [action, value]) => {
          if (BUYING_INTENT_MAP[action]) {
            acc.push({ action: BUYING_INTENT_MAP[action], interactions: value })
          }
          return acc
        }, [])

        setInteractions(buyingIntentInteractions)
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

export default useGetConversionBuyingIntentInteractions
