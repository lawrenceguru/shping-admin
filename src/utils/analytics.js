import intl from 'react-intl-universal'
import { colors } from '../components/organisms/AudienceGraph'
import { capitalize } from './helpers'

export const impressionsFields = ['product', 'timeline', 'cross_market_link']
export const interactionsFields = ['clicks', 'send_review', 'watch_video', 'submit_todo_card', 'scan']
export const interactionsCompetitorFields = [
  'social_link_clicks',
  'link_clicks',
  'clicks',
  'reviews',
  'video_views',
  'activations'
]

export const getValidInteraction = interaction => {
  let result = {}

  if (interaction) {
    result = Object.keys(interaction).reduce((res, itemKey) => {
      const currRes = { ...res }

      if (itemKey.includes('click') || itemKey.includes('visit')) {
        currRes.clicks = currRes.clicks ? currRes.clicks + interaction[itemKey] : interaction[itemKey]
      } else {
        currRes[itemKey] = interaction[itemKey]
      }

      return currRes
    }, {})
  }

  return result
}

export const getDataForPieChart = (data, key) => {
  const othersItem = {
    name: intl.get('audiencePage.others'),
    y: 0,
    color: '#5553ce'
  }
  let currColor = 0
  let result = []

  data.forEach(item => {
    if (item[key] && item[key] !== 'other') {
      result.push({
        name: capitalize(item[key]),
        y: item.num_users,
        color: colors[currColor]
      })
      currColor += 1
    } else {
      othersItem.y += item.num_users
    }
  })

  if (key === 'shop' && result.length > 8) {
    const overflowValues = result.slice(8)
    const scans = overflowValues.reduce((res, currItem) => {
      return res + currItem.y
    }, 0)

    othersItem.y += scans
    result = result.slice(0, 8)
    result.push(othersItem)
  } else if (othersItem.y !== 0) {
    result.push(othersItem)
  }

  return result
}

export const getNameFromTitle = title => {
  let name = ''
  const currentLocale = localStorage.getItem('lang')

  if (typeof title === 'object') {
    name = title[currentLocale] || title.en
  } else if (title) {
    name = title
  }
  return name
}

export const getGroupedByBrandsCrossMarketingData = data => {
  const result = {
    categories: []
  }

  const colorsForBrands = ['rgb(183, 183, 183)', '#FBC9C9']

  if (data && data.length) {
    const summaryActions = {}

    data.forEach(item => {
      summaryActions[item.brand || 'other'] = {
        impressions:
          (Number(summaryActions[item.brand || 'other'] && summaryActions[item.brand || 'other'].impressions) || 0) +
          (item.impressions || 0),
        adv_clicks:
          (Number(summaryActions[item.brand || 'other'] && summaryActions[item.brand || 'other'].adv_clicks) || 0) +
          (item.adv_clicks || 0)
      }
    })

    let sortedActions = {}

    Object.keys(summaryActions).forEach(item => {
      result.categories = result.categories ? [...result.categories, item] : [item]
      sortedActions = {
        ...sortedActions,
        impressions: sortedActions.impressions
          ? [...sortedActions.impressions, summaryActions[item].impressions]
          : [summaryActions[item].impressions],
        adv_clicks: sortedActions.adv_clicks
          ? [...sortedActions.adv_clicks, summaryActions[item].adv_clicks]
          : [summaryActions[item].adv_clicks]
      }
    })

    result.data = Object.keys(sortedActions).map((item, index) => ({
      name: intl.get(`overviewPage.crossMarketPerformanceGraph.${item}`),
      data: sortedActions[item],
      color: colorsForBrands[index]
    }))
  }

  return result
}

const sortLayout = (a, b) => {
  if (a.y > b.y) {
    return 1
  }

  if (a.y < b.y) {
    return -1
  }

  if (a.x > b.x) {
    return 1
  }

  if (a.x < b.x) {
    return -1
  }

  return 0
}

const getOffsetFromWidth = (width, offset) => {
  switch (width) {
    case 1:
      return offset * 3
    case 2:
      return offset
    case 3:
      return offset
    case 4:
      return 0
    default:
      return 0
  }
}

export const proccessLayout = (values, offset, cols) => {
  let result = []

  if (values && values.length) {
    const proccessedLayout = values.map(item => ({
      ...item,
      offset: cols === 4 ? getOffsetFromWidth(item.w, offset) : (cols - item.w) * offset
    }))
    result = proccessedLayout.sort(sortLayout)
  }

  return result
}

const filtersFields = {
  selectFirstDate: 'from',
  selectSecondDate: 'to',
  selectCountry: 'country',
  selectBrand: 'brand',
  selectRange: 'aggregation'
}

const rangeValues = {
  get_days: 'DAILY',
  get_weeks: 'WEEKLY',
  get_months: 'MONTHLY'
}

export const proccessFilterValues = filters => {
  const result = {}

  if (filters) {
    Object.keys(filters).forEach(item => {
      if (filters[item] !== 'any') {
        result[item] = item === 'selectRange' ? rangeValues[filters[item]] : `"${filters[item]}"`
      }
    })
  }

  return result
}

export const proccessFiltersForGraphqlRequest = filters => {
  let result = ``
  if (filters) {
    Object.keys(filtersFields).forEach(key => {
      const proccessedFiltersValues = proccessFilterValues(filters)
      const isHaveValue = proccessedFiltersValues[key] && proccessedFiltersValues[key] !== 'any'
      const pairFilter = `${filtersFields[key]}: ${proccessedFiltersValues[key]}`
      const prefix = result ? ', ' : '('

      result += isHaveValue ? `${prefix}${pairFilter}` : ''
    })
  }
  return result ? `${result})` : ''
}

export const getModalField = key => {
  switch (key) {
    case 'interactions':
      return interactionsFields
    case 'impressions':
      return impressionsFields
    case 'interactions_competitors':
      return interactionsCompetitorFields
    default:
      return []
  }
}

export const modifyDataForModal = (data, key) => {
  let result = {}

  if (data) {
    result = {
      ...data
    }

    result.primaryKey = key

    Object.keys(data).forEach(item => {
      if (item.includes('_name')) {
        result.name = data[item]
      }

      if (item.includes('image')) {
        result.image = data[item]
      }

      if (getModalField(key).includes(item)) {
        result[key] = {
          ...result[key],
          [item]: data[item]
        }
      }
    })
  }

  return result
}

const AggregationEnum = {
  get_days: 'DAILY',
  get_weeks: 'WEEKLY',
  get_months: 'MONTHLY'
}

/**
 * Converts filter params into appropriate GraphQL API variables
 * @param {{
 *  brand?: string
 *  country?: string
 *  aggregation?: 'get_days' | 'get_weeks' | 'get_months'
 *  gtins?: string[]
 * }} filterParams
 */
export const convertFilterParams = filterParams => {
  // eslint-disable-next-line prefer-const
  let filters = {}

  if (filterParams.brand && filterParams.brand !== 'any') {
    filters.brand = filterParams.brand
  }

  if (filterParams.country && filterParams.country !== 'any') {
    filters.country = filterParams.country
  }

  if (filterParams.aggregation) {
    filters.aggregation = AggregationEnum[filterParams.aggregation]
  }

  if (filterParams.gtins && filterParams.gtins.length) {
    filters.gtins = filterParams.gtins
  }

  // Delete brand if any gtins selected
  if (filters.brand && filters.gtins) {
    delete filters.brand
  }

  return filters
}

/**
 * Converts metrics dataset to summary
 * @param {array} metrics
 */
export const summariseMetrics = ({ metrics = [], scale = {} }) =>
  metrics.reduce((res, metricData) => {
    const summary = { ...res }
    Object.keys(metricData).forEach(metric => {
      if (!summary[metric]) {
        summary[metric] = 0
      }
      summary[metric] += metricData[metric]
    })
    return summary
  }, scale)
