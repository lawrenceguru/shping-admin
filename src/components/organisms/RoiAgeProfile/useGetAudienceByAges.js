import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'
import { colors } from '../AudienceGraph'

const AgesMap = {
  age_0_25: '0 - 25',
  age_26_35: '26 - 35',
  age_36_45: '36 - 45',
  age_46_55: '46 - 55',
  age_56_plus: '56+'
}

const GET_AUDIENCE_BY_AGES_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      audience {
        age_0_25
        age_26_35
        age_36_45
        age_46_55
        age_56_plus
      }
    }
  }
`

const useGetAudienceByAges = ({ from, to, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_AUDIENCE_BY_AGES_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, gtins }) }
  })

  const [audiencePieData, setAudiencePieData] = useState([])

  useEffect(() => {
    if (data) {
      const audienceRecord = get(data, 'analytics.audience') || []

      if (audienceRecord.length) {
        setAudiencePieData(
          Object.entries(audienceRecord[0]).reduce((acc, [ageRange, interactions], index) => {
            if (Number(interactions) > 0) {
              acc.push({
                name: AgesMap[ageRange],
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

export default useGetAudienceByAges
