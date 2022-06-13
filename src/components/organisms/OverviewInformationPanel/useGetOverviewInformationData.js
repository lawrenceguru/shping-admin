import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams, summariseMetrics } from '../../../utils/analytics'

const GET_OVERVIEW_INFO_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $aggregation: Aggregation!) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, aggregation: $aggregation) {
      engagements {
        all_events_users
        interactions
        total_spend
        receipt_sales
        receipt_sales_value
      }
    }
  }
`
const initialState = {
  users: 0,
  interactions: 0,
  sales: 0,
  receiptSalesAmount: 0,
  spend: 0
}

const useGetOverviewInformationData = ({ from, to, brand, country, aggregation }) => {
  const { data, loading } = useQuery(GET_OVERVIEW_INFO_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation }) }
  })

  const [infoData, setInfoData] = useState({ ...initialState })

  useEffect(() => {
    if (data) {
      const engagements = get(data, 'analytics.engagements')
      if (engagements.length) {
        // eslint-disable-next-line camelcase
        const {
          all_events_users: users,
          interactions,
          receipt_sales: sales,
          receipt_sales_value: receiptSalesAmount = 0,
          total_spend: spend
        } = summariseMetrics({
          metrics: engagements,
          scale: { all_events_users: 0, interactions: 0, receipt_sales: 0, receipt_sales_value: 0, total_spend: 0 }
        })
        setInfoData({
          users,
          interactions,
          sales,
          receiptSalesAmount,
          spend
        })
      } else {
        setInfoData({ ...initialState })
      }
    }
  }, [data])

  return {
    loading,
    ...infoData
  }
}

export default useGetOverviewInformationData
