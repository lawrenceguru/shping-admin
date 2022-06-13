import gql from 'graphql-tag'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

const GET_TOP_VIDEOS = gql`
  query($from: String, $to: String, $country: String, $brand: String) {
    analytics(from: $from, to: $to, country: $country, brand: $brand) {
      top_videos {
        title
        url
        views
      }
    }
  }
`

const useGetConversionVideos = ({ from, to, brand, country }) => {
  const { data, loading } = useQuery(GET_TOP_VIDEOS, {
    variables: { from, to, ...convertFilterParams({ brand, country }) }
  })

  const [topVideos, setTopVideos] = useState([])

  useEffect(() => {
    if (data) {
      const videos = get(data, 'analytics.top_videos') || []

      if (videos.length) {
        setTopVideos(videos)
      }
    }
  }, [data])

  return {
    loading,
    topVideos
  }
}

export default useGetConversionVideos
