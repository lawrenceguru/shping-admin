import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'
import { colors } from '../AudienceGraph'

const GenerationNamesMap = {
  gen_bb: 'Baby Boomers: 1946 - 1964',
  gen_x: 'Gen X: 1965 - 1980',
  gen_y: 'Gen Y: (Millennials): 1981 - 1996',
  gen_z: 'Gen Z: 1997 - 2012',
  gen_alpha: 'Gen Alpha: 2013 - current'
}

const GET_AUDIENCE_BY_GENDERS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      audience {
        gen_bb
        gen_x
        gen_y
        gen_z
        gen_alpha
      }
    }
  }
`

const useGetAudienceByGenerations = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_AUDIENCE_BY_GENDERS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [audiencePieData, setAudiencePieData] = useState([])

  useEffect(() => {
    if (data) {
      const audienceRecord = get(data, 'analytics.audience') || []

      if (audienceRecord.length) {
        setAudiencePieData(
          Object.entries(audienceRecord[0]).reduce((acc, [generation, interactions], index) => {
            if (interactions && GenerationNamesMap[generation]) {
              acc.push({
                name: GenerationNamesMap[generation],
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

export default useGetAudienceByGenerations
