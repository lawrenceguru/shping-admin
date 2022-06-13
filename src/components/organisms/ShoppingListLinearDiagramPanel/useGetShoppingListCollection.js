import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_OVERVIEW_ENGAGEMENT_QUERY = gql`
  query getShoppingListUsageAnalytics(
    $from: String
    $to: String
    $country: String
    $state: String
    $postcode: String
    $aggregation: Aggregation
  ) {
    getShoppingListUsageAnalytics(
      from: $from
      to: $to
      country: $country
      state: $state
      postcode: $postcode
      aggregation: $aggregation
    ) {
      from {
        year
        month
        day
      }
      to {
        year
        month
        day
      }
      aggregation
      country
      state
      postcode
      city
      shopping_lists {
        year
        month
        week
        day
        country
        state
        postcode
        city
        users
        go_clicks
        opens
        finish_clicks
        avg_shopping_list_size
        ocasional_buys
        created_lists
        main_added_products
        custom_added_products
        purchased_products
        shared_accounts
        receipts
        loyaltee_cards
        time_spent
      }
      shopping_lists_searches {
        year
        month
        week
        day
        postcode
        city
        state
        country
        category {
          id
          name
        }
        attribute {
          id
          name
        }
        cat_opens
        searches
      }
    }
  }
`

const initialState = {
  users: [],
  addedProducts: [],
  purchasedProducts: [],
  finishClicks: [],
  receipts: [],
  loyalteeCards: []
}

const useGetShoppingListCollection = ({ from, to, state, postcode, country, aggregation }) => {
  const { data, loading } = useQuery(GET_OVERVIEW_ENGAGEMENT_QUERY, {
    variables: { from, to, state, postcode, ...convertFilterParams({ country, aggregation }) }
  })

  const [infoData, setInfoData] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const shoppingLists = get(data, 'getShoppingListUsageAnalytics.shopping_lists') || []
      if (shoppingLists.length) {
        setInfoData({
          users: shoppingLists.map(el => el.users),
          addedProducts: shoppingLists.map(el => el.custom_added_products + el.main_added_products),
          purchasedProducts: shoppingLists.map(el => el.purchased_products),
          finishClicks: shoppingLists.map(el => el.finish_clicks),
          receipts: shoppingLists.map(el => el.receipts),
          loyalteeCards: shoppingLists.map(el => el.loyaltee_cards),
          dates: shoppingLists.map(({ day, week, month, year }) => {
            return { day, week, month, year }
          })
        })
      } else {
        setInfoData({ ...initialState })
      }
    }
  }, [data])
  console.log(infoData)
  return {
    loading,
    ...infoData
  }
}

export default useGetShoppingListCollection
