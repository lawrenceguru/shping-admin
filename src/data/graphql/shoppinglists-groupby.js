import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../utils/analytics'

const SHOPPINGLIST_USAGE_GROUPBY = gql`
  query getShoppingListUsageAnalytics(
    $from: String
    $to: String
    $country: String
    $state: String
    $postcode: String
    $groupBy: [String]
  ) {
    getShoppingListUsageAnalytics(
      from: $from
      to: $to
      country: $country
      state: $state
      postcode: $postcode
      groupBy: $groupBy
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

const useGetShoppingListUsageGroupBy = ({ from, to, country, state, postcode, groupBy }) => {
  const { data, loading } = useQuery(SHOPPINGLIST_USAGE_GROUPBY, {
    variables: { from, to, state, postcode, groupBy, ...convertFilterParams({ country }) }
  })

  const [shoppingListSearch, setShoppingListSearch] = useState(undefined)

  useEffect(() => {
    if (data) {
      const shoppingListsSearches = get(data, 'getShoppingListUsageAnalytics.shopping_lists_searches') || []
      if (shoppingListsSearches.length) {
        setShoppingListSearch(shoppingListsSearches)
      } else {
        setShoppingListSearch(undefined)
      }
    }
  }, [data])

  return {
    loading,
    searches: shoppingListSearch
  }
}

export default useGetShoppingListUsageGroupBy
