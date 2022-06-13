import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_BRANDS_REVIEWS_QUERY = gql`
  query($from: String!, $to: String!) {
    analytics(from: $from, to: $to) {
      reviews: brands_reviews {
        key
        value
      }
    }
  }
`

const GET_PRODUCTS_REVIEWS_QUERY = gql`
  query($from: String!, $to: String!) {
    analytics(from: $from, to: $to) {
      reviews: products_reviews {
        key
        value
      }
    }
  }
`

const useGetCampaigns = ({ from, to, brand, country }) => {
  const QUERY = brand && brand !== 'any' ? GET_PRODUCTS_REVIEWS_QUERY : GET_BRANDS_REVIEWS_QUERY

  const { data, loading } = useQuery(QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (data) {
      const reviewsData = get(data, 'analytics.reviews') || []

      if (reviewsData.length) {
        setReviews(reviewsData)
      } else {
        setReviews([])
      }
    }
  }, [data])

  return {
    loading,
    reviews
  }
}

export default useGetCampaigns
