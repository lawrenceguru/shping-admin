import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../utils/analytics'

const SHOPPINGLIST_USAGE = gql`
  query getShoppingListUsageAnalytics($from: String, $to: String, $country: String, $state: String, $postcode: String) {
    getShoppingListUsageAnalytics(from: $from, to: $to, country: $country, state: $state, postcode: $postcode) {
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

const useGetConversionBuyingIntentInteractions = ({ from, to, country, state, postcode }) => {
  const { data, loading } = useQuery(SHOPPINGLIST_USAGE, {
    variables: { from, to, state, postcode, ...convertFilterParams({ country }) }
  })

  // const [shoppinglistsUsage, setShoppinglistsUsage] = useState(undefined)
  const [shoppingList, setShoppingList] = useState(undefined)
  const [shoppingListSearch, setShoppingListSearch] = useState(undefined)

  useEffect(() => {
    if (data) {
      const shoppingLists = get(data, 'getShoppingListUsageAnalytics.shopping_lists') || []
      const shoppingListsSearches = get(data, 'getShoppingListUsageAnalytics.shopping_lists_searches') || []
      if (shoppingLists.length) {
        setShoppingList(shoppingLists[0])
      } else {
        setShoppingList(undefined)
      }
      if (shoppingListsSearches.length) {
        setShoppingListSearch(shoppingListsSearches[0])
      } else {
        setShoppingListSearch(undefined)
      }
    }
  }, [data])

  return {
    loading,
    uniqueUsers: shoppingList && shoppingList.users,
    goClicks: shoppingList && shoppingList.go_clicks,
    opens: shoppingList && shoppingList.opens,
    finishClicks: shoppingList && shoppingList.finish_clicks,
    avgShoppingListSize: shoppingList && shoppingList.avg_shopping_list_size,
    ocasionalBuys: shoppingList && shoppingList.ocasional_buys,
    createdLists: shoppingList && shoppingList.created_lists,
    mainAddedProducts: shoppingList && shoppingList.main_added_products,
    customAddedProducts: shoppingList && shoppingList.custom_added_products,
    purchasedProducts: shoppingList && shoppingList.purchased_products,
    sharedAccounts: shoppingList && shoppingList.shared_accounts,
    receipts: shoppingList && shoppingList.receipts,
    loyalteeCards: shoppingList && shoppingList.loyaltee_cards,
    timeSpent: shoppingList && shoppingList.time_spent,
    searches: shoppingListSearch && shoppingListSearch.searches
  }
}

export default useGetConversionBuyingIntentInteractions
