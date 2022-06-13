import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_ROI_INFO_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $gtins: [String!]) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, gtins: $gtins) {
      review_rating_score

      engagements {
        impressions
        all_events_users
        product_page_hits
      }
    }
  }
`
const initialState = {
  impressions: 0,
  productHits: 0,
  users: 0,
  reviewRatingScore: 'N/A'
}

const useGetRoiInfo = ({ from, to, brand, country, gtins }) => {
  const { data, loading } = useQuery(GET_ROI_INFO_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, gtins }) }
  })

  const [info, setInfo] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const engagements = get(data, 'analytics.engagements')
      const reviewRatingScore = get(data, 'analytics.review_rating_score')

      if (engagements.length) {
        // eslint-disable-next-line camelcase
        const { impressions, product_page_hits, all_events_users } = engagements[0]

        setInfo({
          impressions,
          productHits: product_page_hits,
          users: all_events_users,
          reviewRatingScore
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

export default useGetRoiInfo
