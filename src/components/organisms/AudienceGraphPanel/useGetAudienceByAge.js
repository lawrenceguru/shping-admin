import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_AUDIENCE_BY_AGE = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      audience {
        age_0_20
        age_21_25
        age_26_30
        age_31_35
        age_36_40
        age_41_45
        age_46_50
        age_51_55
        age_56_60
        age_61_65
        age_66_70
      }
    }
  }
`

const useGetAudienceByAge = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_AUDIENCE_BY_AGE, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [audienceRange, setAudienceRange] = useState([])

  useEffect(() => {
    if (data) {
      const audienceRecord = get(data, 'analytics.audience') || []

      if (audienceRecord.length) {
        setAudienceRange(
          Object.values(audienceRecord[0]).reduce((acc, interactions) => {
            if (Number(interactions) >= 0) {
              acc.push(interactions)
            }
            return acc
          }, [])
        )
      } else {
        setAudienceRange([])
      }
    }
  }, [data])

  return {
    loading,
    audienceRange
  }
}

export default useGetAudienceByAge
