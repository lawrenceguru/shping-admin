import gql from 'graphql-tag'
import moment from 'moment'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { convertFilterParams } from '../../../utils/analytics'

export const getLatestDate = dates => {
  return (
    (dates &&
      dates.length &&
      dates.reduce((currRes, currItem) => {
        let res = { ...currRes }

        if (!res.end_time || moment(res.to, 'YYYY-MM-DD').isBefore(currItem.from)) {
          res = { ...currItem }
        }

        return res
      }, {})) ||
    {}
  )
}

const formatDate = inputDate => {
  if (!inputDate) {
    return inputDate
  }
  try {
    const dt = new Date(inputDate)
    return dt.toLocaleString()
  } catch (err) {
    return inputDate
  }
}

const getLatestCampaignsDates = campaigns => {
  const result = {}

  if (campaigns && campaigns.length) {
    const blast = []
    const rotation = []
    campaigns.forEach(campaign => {
      if (campaign.blast) blast.push(campaign)
      else rotation.push(campaign)
    })

    if (blast.length) {
      const blastDates = getLatestDate(blast)
      result.blast = `${formatDate(blastDates.from)} - ${formatDate(blastDates.to)}`
    }

    if (rotation.length) {
      const rotationDates = getLatestDate(rotation)
      result.rotation = `${formatDate(rotationDates.from)} - ${formatDate(rotationDates.to)}`
    }
  }

  return result
}

const processTopProductsData = data => {
  return data.map(product => {
    const newProduct = { ...product }

    // Find and add fields with the latest `blast` and `rotation` campaign dates
    if (product.campaigns && product.campaigns.length) {
      const campaigns = getLatestCampaignsDates(product.campaigns)
      Object.entries(campaigns).forEach(([campaignName, dates]) => {
        newProduct[campaignName] = dates
      })
    }

    // Backward compatibility fields match for impressions and interactions modals
    newProduct.impressions = {
      total: product.impressions,
      timeline: product.timeline_impressions,
      product: product.product_page_impressions,
      cross_market_link: product.cross_marketing_impressions
    }
    newProduct.interactions = {
      total: product.interactions,
      clicks: product.clicks,
      send_review: product.reviews,
      watch_video: product.video_views,
      submit_todo_card: product.activations,
      scan: product.scans
    }

    return newProduct
  })
}

const GET_TOP_PRODUCTS_QUERY = gql`
  query($from: String!, $to: String!, $country: String, $brand: String, $aggregation: Aggregation!) {
    analytics(from: $from, to: $to, country: $country, brand: $brand, aggregation: $aggregation) {
      top_products {
        product_image
        product_name

        impressions
        timeline_impressions
        product_page_impressions
        cross_marketing_impressions

        interactions
        clicks
        reviews
        video_views
        scans
        activations

        campaigns {
          from
          to
          blast
        }
      }
    }
  }
`

const useGetTopProductsData = ({ from, to, brand, country, aggregation }) => {
  const { data, loading } = useQuery(GET_TOP_PRODUCTS_QUERY, {
    variables: { from, to, ...convertFilterParams({ brand, country, aggregation }) }
  })

  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    if (data) {
      const productsData = get(data, 'analytics.top_products') || []
      if (productsData.length) {
        setTopProducts(processTopProductsData(productsData))
      } else {
        setTopProducts([])
      }
    }
  }, [data])

  return {
    loading,
    topProducts
  }
}

export default useGetTopProductsData
