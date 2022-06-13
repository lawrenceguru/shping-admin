import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_TOP_USERS_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $aggregation: Aggregation!) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, aggregation: $aggregation) {
      top_users {
        name
        image
        age
        level
        scans
      }
    }
  }
`

const useGetTopUsersData = ({ from, to, brand, country, aggregation }) => {
  const { data, loading } = useQuery(GET_TOP_USERS_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation }) }
  })

  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    if (data) {
      setTopUsers(get(data, 'analytics.top_users') || [])
    }
  }, [data])

  return {
    loading,
    topUsers
  }
}

export default useGetTopUsersData
