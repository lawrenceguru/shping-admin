import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const EDUCATION_MAP = {
  video_views: 'Video Views',
  read_reviews: 'Read Reviews',
  text_review_contributions: 'Written Review Contribution',
  video_review_contributions: 'Video Review Contribution'
}

const GET_EDUCATION_INTERACTIONS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      education: engagements {
        video_views
        read_reviews
        text_review_contributions
        video_review_contributions
      }
    }
  }
`

const initialState = Object.values(EDUCATION_MAP).reduce((acc, action) => {
  acc.push({ action, interactions: 0 })
  return acc
}, [])

const useGetConversionEducationInteractions = ({ from, to, ...filterParams }) => {
  const { data, loading } = useQuery(GET_EDUCATION_INTERACTIONS, {
    variables: { from, to, ...convertFilterParams(filterParams) }
  })

  const [interactions, setInteractions] = useState(initialState)

  useEffect(() => {
    if (data) {
      const education = get(data, 'analytics.education') || []

      if (education.length) {
        const edInteractionsData = Object.entries(education[0]).reduce((acc, [action, value]) => {
          if (EDUCATION_MAP[action]) {
            acc.push({
              action: EDUCATION_MAP[action],
              interactions: value
            })
          }
          return acc
        }, [])

        setInteractions(edInteractionsData)
      } else {
        setInteractions(initialState)
      }
    }
  }, [data])

  return {
    loading,
    interactions
  }
}

export default useGetConversionEducationInteractions
