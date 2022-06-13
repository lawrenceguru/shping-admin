import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_SPEND_INFO_QUERY = gql`
  query($from: String, $to: String, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      spendInfo: all_spends {
        video_views_spend
        impressions_spend
        clicks_spend
        reviews_spend
      }
    }
  }
`

const initialState = {
  reviews: 0,
  videoViews: 0,
  interactions: 0,
  impressions: 0
}

const useGetSpendInformation = ({ from, to, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_SPEND_INFO_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, gtins }) }
  })

  const [info, setInfo] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const spendInfo = get(data, 'analytics.spendInfo')

      if (spendInfo.length) {
        // eslint-disable-next-line camelcase
        const { video_views_spend, impressions_spend, clicks_spend, reviews_spend } = spendInfo[0]

        setInfo({
          impressions: impressions_spend,
          interactions: clicks_spend,
          videoViews: video_views_spend,
          reviews: reviews_spend
        })
      } else {
        setInfo({ ...initialState })
      }
    }
  }, [data])

  return {
    loading,
    ...info
  }
}

export default useGetSpendInformation
