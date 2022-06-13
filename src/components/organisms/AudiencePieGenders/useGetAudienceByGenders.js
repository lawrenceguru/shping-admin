import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'
import { capitalize } from '../../../utils/helpers'
import { colors } from '../AudienceGraph'

const GET_AUDIENCE_BY_GENDERS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      audience {
        male
        female
        others
      }
    }
  }
`

const useGetAudienceByGenders = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_AUDIENCE_BY_GENDERS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [audiencePieData, setAudiencePieData] = useState([])

  useEffect(() => {
    if (data) {
      const audienceRecord = get(data, 'analytics.audience') || []

      if (audienceRecord.length) {
        setAudiencePieData(
          Object.entries(audienceRecord[0]).reduce((acc, [gender, interactions], index) => {
            if (Number(interactions) > 0) {
              acc.push({
                name: capitalize(gender),
                y: interactions,
                color: colors[index]
              })
            }
            return acc
          }, [])
        )
      } else {
        setAudiencePieData([])
      }
    }
  }, [data])

  return {
    loading,
    audiencePieData
  }
}

export default useGetAudienceByGenders
