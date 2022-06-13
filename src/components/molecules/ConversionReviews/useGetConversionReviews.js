import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_REVIEWS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      reviews {
        ts
        user_name
        user_image
        product_name
        product_brand
        product_image
        rate
        review_text
      }
    }
  }
`

const useGetConversionReviews = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_REVIEWS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (data) {
      setReviews(get(data, 'analytics.reviews') || [])
    }
  }, [data])

  return {
    loading,
    reviews
  }
}

export default useGetConversionReviews
