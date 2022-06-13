import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const INTERACTIONS_MAP = {
  clicks: 'clicks',
  reviews: 'send_review',
  video_views: 'watch_video',
  activations: 'submit_todo_card',
  scans: 'scan'
}

const GET_CONVERSION_INTERACTIONS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      engagements {
        clicks
        reviews
        video_views
        activations
        scans
      }
    }
  }
`

const useGetConversionInteractions = ({ from, to, ...filterParams }) => {
  const { data, loading } = useQuery(GET_CONVERSION_INTERACTIONS, {
    variables: { from, to, ...convertFilterParams(filterParams) }
  })

  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    if (data) {
      const interactionsRecord = get(data, 'analytics.engagements') || []

      if (interactionsRecord.length) {
        const interactionsData = Object.entries(interactionsRecord[0]).reduce((acc, [action, value]) => {
          if (INTERACTIONS_MAP[action]) {
            acc.push({ action: INTERACTIONS_MAP[action], num_interactions: value })
          }
          return acc
        }, [])

        setInteractions(interactionsData)
      } else {
        setInteractions([])
      }
    }
  }, [data])

  return {
    loading,
    interactions
  }
}

export default useGetConversionInteractions
