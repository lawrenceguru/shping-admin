import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

const SHOPPINGLIST_USER = gql`
  query getShoppingListUserAnalytics(
    $dates: DatesPeriodInput
    $location: LocationInput
    $pagination: PaginationInput
    $sort: Sort
    $user: UserFilter
  ) {
    getShoppingListUserAnalytics(
      dates: $dates
      location: $location
      pagination: $pagination
      sort: $sort
      user: $user
    ) {
      shopping_lists_users {
        items {
          user_id
          first_name
          last_name
          level
          user_age
          user_sex
          reg_date
          added_products
          shoppinglists_products
          purchased_products
          purchase_frequency
          go_clicks
          finish_clicks
          loyaltee_cards
          scans
          receipts
          categories
          attributes
          stores
        }
        meta {
          pagination {
            next_token
            query_execution_id
            page_size
          }
        }
      }
    }
  }
`

const useShoppingListUser = ({ from, to, country, state, postcode, pagination, sort }) => {
  const dates = { from, to }
  const location = {
    country: country === 'any' ? '' : country,
    state,
    postcode
  }
  const { data, loading } = useQuery(SHOPPINGLIST_USER, {
    variables: { dates, location, pagination, sort }
  })
  const [metaPagination, setMetaPagination] = useState()
  const [shoppingListUsers, setShoppingListUsers] = useState([])

  useEffect(() => {
    if (data) {
      const shoppingLists = get(data, 'getShoppingListUserAnalytics.shopping_lists_users.items') || []
      const paginationData = get(data, 'getShoppingListUserAnalytics.shopping_lists_users.meta.pagination') || []
      if (shoppingLists.length) {
        setShoppingListUsers(shoppingLists)
        setMetaPagination(paginationData)
      } else {
        setShoppingListUsers([])
        setMetaPagination(paginationData)
      }
    }
  }, [data])

  return {
    loading,
    shoppingListUsers,
    metaPagination
  }
}

export default useShoppingListUser
