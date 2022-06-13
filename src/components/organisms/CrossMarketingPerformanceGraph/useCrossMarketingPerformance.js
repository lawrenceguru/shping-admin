import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams, getGroupedByBrandsCrossMarketingData } from '../../../utils/analytics'

const GET_CROSS_MARKETING_PERFORMANCE = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      competitors_by_products {
        brand
        product_name
        product_image
        impressions
        adv_clicks
      }
    }
  }
`

const useGetCrossMarketingPerformance = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_CROSS_MARKETING_PERFORMANCE, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [brandsPerformance, setBrandsPerformance] = useState([])

  useEffect(() => {
    if (data) {
      const products = get(data, 'analytics.competitors_by_products') || []

      if (products.length) {
        setBrandsPerformance(getGroupedByBrandsCrossMarketingData(products))
      } else {
        setBrandsPerformance([])
      }
    }
  }, [data])

  return {
    loading,
    brandsPerformance
  }
}

export default useGetCrossMarketingPerformance
