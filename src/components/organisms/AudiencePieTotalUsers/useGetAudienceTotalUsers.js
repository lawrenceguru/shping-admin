import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const START_DATE = '2020-07-01'

const GET_AUDIENCE_TOTAL_USERS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    all_time: analytics(from: "${START_DATE}") {
      audience {
        interactions_users
      }
    }

    over_defined_period: analytics(from: $from, to: $to, country: $country, brand: $brand) {
      audience {
        interactions_users
      }
    }
  }
`

const useGetAudienceTotalUsers = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_AUDIENCE_TOTAL_USERS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [audienceTotalUsers, setAudienceTotalUsers] = useState({
    allTime: 0,
    overDefinedPeriod: 0
  })

  useEffect(() => {
    if (data) {
      const allTime = get(data, 'all_time.audience') || []
      const overDefinedPeriod = get(data, 'over_defined_period.audience') || []

      setAudienceTotalUsers({
        allTime: allTime.length ? allTime[0].interactions_users : 0,
        overDefinedPeriod: overDefinedPeriod.length ? overDefinedPeriod[0].interactions_users : 0
      })
    }
  }, [data, loading])

  return {
    loading,
    audienceTotalUsers
  }
}

export default useGetAudienceTotalUsers
