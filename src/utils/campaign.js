import moment from 'moment'
import uuid from 'uuid4'
import { getDataInFormatUTCToAPi, formatUTCToApi, parseDate } from './helpers/date'
import { convertFromUint256, normalizeFloat } from './helpers/mathOperations'
import { name as countryName } from './consts'

export const chartDateMapping = {
  days: 7,
  weeks: 8,
  months: 12
}

export const getFiltersForRequest = (filters, type = 'campaign') => {
  const result = {}
  const values = Object.keys(filters).reduce((newValues, key) => {
    const currentIterationResult = { ...newValues }
    currentIterationResult[key] = filters[key].value
    return currentIterationResult
  }, {})
  const { condition, action, dates } = values

  if (action || condition) {
    result.events = {
      type: action,
      condition
    }
  }

  if (dates && dates.length) {
    if (type === 'campaign') {
      result.start_date = getDataInFormatUTCToAPi(dates[0], 'YYYY-MM-DD', false, true)
      result.end_date = getDataInFormatUTCToAPi(dates[1], 'YYYY-MM-DD', false, false)
    } else {
      // eslint-disable-next-line prefer-destructuring
      result.from_date = dates[0]
      // eslint-disable-next-line prefer-destructuring
      result.to_date = dates[1]
    }
  }

  return result
}

export const hasNoRestrictions = (action, rewardsActions) => {
  const dataAction = action && rewardsActions.find(el => el.id === action)
  return !!(dataAction && dataAction.restrictions === false)
}

export const isAudienceEmpty = ({
  countries,
  languages,
  postcode,
  scan_countries: scanCountries,
  registration_methods: registrationMethods,
  // eslint-disable-next-line camelcase
  weekly_scans,
  scan_date: scanDate,
  userLevels,
  minAge,
  maxAge,
  gender
}) => {
  return (
    (!countries || !countries.length) &&
    (!languages || !languages.length) &&
    !scanDate &&
    // eslint-disable-next-line camelcase
    !(weekly_scans && weekly_scans.from) &&
    // eslint-disable-next-line camelcase
    !(weekly_scans && weekly_scans.to) &&
    !registrationMethods &&
    !scanCountries &&
    !postcode &&
    (!userLevels || userLevels.length === 0) &&
    !minAge &&
    !maxAge &&
    !gender
  )
}

export const generateCampaignRequest = payload => {
  const {
    rewardAdjustmentActive,
    adjustment,
    name,
    status,
    budget,
    products,
    countries,
    languages,
    postcode,
    gender,
    ageRange,
    action,
    points,
    partner_brand: partnerBrand,
    location,
    condition,
    count,
    allProducts
  } = payload

  const request = {
    ...(rewardAdjustmentActive &&
      adjustment &&
      adjustment.coins_step &&
      adjustment.result && {
        adjustment: {
          event: parseFloat(adjustment.result),
          coins_step: normalizeFloat(adjustment.coins_step)
        }
      }),
    ...(payload.receipt_active !== undefined && {
      receipts_restrictions: { recognized_receipts: payload.receipt_active }
    }),
    ...(name && { name }),
    ...(partnerBrand && { partner_brand: partnerBrand }),
    ...(status && { status }),
    ...(action && {
      events: [
        {
          [action]: {
            ...(points && { coins: normalizeFloat(points) }),
            ...(location && { unique_location: location }),
            ...(condition && { condition }),
            ...(count && ['daily', 'weekly', 'monthly'].includes(condition) && { count })
          }
        }
      ]
    }),
    ...(payload.start_date && { start_date: getDataInFormatUTCToAPi(payload.start_date, 'M/D/YYYY', false, true) }),
    ...(payload.end_date && { end_date: getDataInFormatUTCToAPi(payload.end_date, 'M/D/YYYY', false, false) }),
    ...(allProducts
      ? {
          products: [],
          all_products: true
        }
      : {
          products: products || [],
          all_products: false
        }),
    ...(!isAudienceEmpty(payload) && {
      audience: {
        ...(countries && { countries }),
        ...(postcode && { postcode: [postcode] }),
        ...(languages && { languages }),
        ...(payload.user_levels && payload.user_levels.length > 0 && { user_levels: payload.user_levels }),
        ...(ageRange && ageRange[0] && { min_age: Number(ageRange[0]) }),
        ...(ageRange && ageRange[1] && { max_age: ageRange[1] === 75 ? 100 : Number(ageRange[1]) }),
        ...(gender && gender !== 'any' && { gender })
      }
    })
  }

  if (budget && budget.interval && budget.per_interval) {
    request.budget = {
      [budget.interval]: normalizeFloat(budget.per_interval)
    }
  }

  return request
}

export const getDataFromCampaign = campaign => {
  const audienceInitial = {
    countries: [],
    languages: [],
    gender: 'any',
    postcode: '',
    ageRange: [],
    user_levels: []
  }
  const {
    name,
    adjustment,
    audience,
    partner_brand: partnerBrand,
    budget,
    status,
    events,
    products,
    all_products: allProducts,
    locations,
    spendings
  } = campaign
  const data = {
    name,
    status,
    products,
    allProducts,
    partner_brand: !!partnerBrand
  }

  if (campaign.start_date) {
    data.start_date = moment(campaign.start_date, 'YYYY-MM-DD').format('M/D/YYYY')
  }

  if (campaign.end_date) {
    data.end_date = moment(campaign.end_date, 'YYYY-MM-DD').format('M/D/YYYY')
    data.campaignTime = 'setData'
  }

  if (campaign.receipts_restrictions && campaign.receipts_restrictions.recognized_receipts) {
    data.receipt_active = campaign.receipts_restrictions.recognized_receipts
  }

  if (adjustment) {
    const newAdjustment = {}
    newAdjustment.result = adjustment.event
    newAdjustment.coins_step = convertFromUint256(adjustment.coins_step).toFixed()
    data.adjustment = { ...newAdjustment }
    data.currency = adjustment.currency
    data.rewardAdjustmentActive = true
  }

  if (budget) {
    const interval = Object.keys(budget)[0]
    data.budget = {
      interval: interval || 'day',
      per_interval: budget[interval] && convertFromUint256(budget[interval]).toFixed()
    }
  }

  if (events && events.length) {
    const eventName = Object.keys(events[0])[0]
    data.action = eventName
    data.condition = events[0][eventName].condition
    data.count = events[0][eventName].count
    data.location = !!events[0][eventName].unique_location
    data.points = convertFromUint256(events[0][eventName].coins).toFixed()
    data.allOptions = events[0][eventName].condition === 'global_once'
  }

  if (audience) {
    const newAudience = { ...audienceInitial, ...audience }
    data.audience = { ...newAudience }
  }

  if (spendings) {
    data.spendings = { ...spendings }
  }
  if (locations) {
    data.locations = locations
  }

  return data
}

export function getFeaturedProductsNames(data, featuredProducts) {
  const result = {}
  if (data && data.length && featuredProducts && featuredProducts.length) {
    data.forEach(item => {
      if (!result[item.campaign]) {
        const product = featuredProducts.find(elem => elem.id === item.campaign)
        result[item.campaign] = (product && product.name) || item.campaign
      }
    })
  }

  return result
}

export function getGroupedFeatureProductMonitoringData(data, featuredProducts) {
  let dataIntervals = []
  let total = 0
  const namesProducts = getFeaturedProductsNames(data, featuredProducts)

  if (data && data.length) {
    const dateGroaped = {}
    data.forEach(item => {
      dateGroaped[item.date] = {
        ...dateGroaped[item.date],
        [namesProducts[item.campaign]]: item.count
      }
      total += item.count
    })
    dataIntervals = Object.keys(dateGroaped).map(key => ({
      ...dateGroaped[key],
      date: moment(key, 'YYYY-MM-DD')
    }))
  }

  return {
    dataIntervals,
    namesProducts,
    total
  }
}

export const generateRequestForFeaturedCampaign = data => {
  let result = {}

  if (data) {
    const dates = []

    if (data.dates && data.dates.length) {
      // eslint-disable-next-line prefer-destructuring
      const start = moment(data.dates[0])
      start.set('hour', 0)
      start.set('minute', 0)
      start.set('second', 0)
      dates[0] = formatUTCToApi(parseDate(moment.utc(`${start.format('YYYY-MM-DDTHH:mm:ss')}Z`).format()))

      const end = moment(data.dates[1])
      end.set('hour', 23)
      end.set('minute', 59)
      end.set('second', 59)
      dates[1] = formatUTCToApi(parseDate(moment.utc(`${end.format('YYYY-MM-DDTHH:mm:ss')}Z`).format()))
    }
    result = {
      ...(data.locations &&
        data.locations.length > 0 && {
          locations: data.locations
        }),
      name: data.name,
      ...(dates && dates[0] && { start_date: dates[0] }),
      ...(dates && dates[1] && { end_date: dates[1] }),
      ...(data.run_time && {
        run_time: moment(data.run_time, 'h:mm A')
          .locale('ru')
          .format('LTS')
      }),
      options: {
        ...(data.options ? { even_distribution: true } : { single_blast: true })
      },
      audience: {
        // ...(data.countries && data.countries.length !== 0 && { countries: data.countries }),
        ...(data.audience.languages && data.audience.languages.length > 0 && { languages: data.audience.languages }),
        ...(data.audience.user_levels &&
          data.audience.user_levels.length > 0 && {
            user_levels: data.audience.user_levels
          }),
        ...(data.audience.min_age && { min_age: Number(data.audience.min_age) }),
        ...(data.audience.max_age && { max_age: Number(data.audience.max_age) }),
        ...(data.audience.gender && data.gender !== 'any' && { gender: data.audience.gender })
      },
      hero_image_url: data.hero_image_url,
      status: data.status || 'inactive',
      ...(data.products &&
        data.products.length !== 0 && {
          products: data.products
        })
    }
  }

  return result
}

export const getDataFromRequestForFeaturedCampaign = campaign => {
  const audienceInitial = {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: [],
    user_levels: []
  }
  const { name, audience, status, products, options, run_time: runTime, hero_image_url: heroImageUrl } = campaign
  const data = {
    name,
    status,
    products,
    options: options.even_distribution,
    hero_image_url: heroImageUrl,
    run_time: runTime
  }

  data.dates = []
  if (campaign.start_date) {
    data.dates[0] = moment(campaign.start_date, 'YYYY-MM-DD').format('M/D/YYYY')
  }

  if (campaign.end_date) {
    data.dates[1] = moment(campaign.end_date, 'YYYY-MM-DD').format('M/D/YYYY')
  }

  if (audience) {
    const newAudience = { ...audienceInitial, ...audience }
    const ageRange = []
    if (newAudience.min_age) {
      ageRange.push(newAudience.min_age)
      delete newAudience.min_age
    } else {
      ageRange.push(0)
    }

    if (newAudience.max_age) {
      ageRange.push(newAudience.max_age === 100 ? 75 : newAudience.max_age)
      delete newAudience.max_age
    } else {
      ageRange.push(ageRange[0] ? ageRange[0] : 0)
    }

    newAudience.ageRange = ageRange
    data.audience = { ...newAudience }
  }

  return data
}

export const getReportsFromRequest = (reports, participants, countries) => {
  let result = []

  if (reports && reports.length) {
    result = reports.map(({ report_by: reportBy, ...rest }) => ({
      ...rest,
      report_by: {
        id: reportBy.id || reportBy,
        info: participants && participants.find(({ id }) => id === (reportBy.id || reportBy))
      },
      filters: {
        ...rest.filters,
        ...(rest.filters.countries &&
          rest.filters.countries.length !== 0 && {
            countries:
              rest.filters.countries &&
              rest.filters.countries.length !== 0 &&
              rest.filters.countries
                .map(
                  country => countries && countries.length !== 0 && countries.find(c => c.iso === country)[countryName]
                )
                .join(', ')
          })
      }
    }))
  }

  return result
}

export const getDetailsReportFromRequest = details => {
  const result = {}

  if (details) {
    result.scans = details && details.scans
    const widgets = details && details.widgets
    const socialMedia =
      widgets &&
      widgets.social_networks &&
      Object.keys(widgets.social_networks).filter(key => key !== 'total_social_networks')
    const videos =
      widgets &&
      widgets.video &&
      Object.keys(widgets.video).filter(key => !['total_video', 'video_subdata'].includes(key))
    const links = widgets && widgets.links && Object.keys(widgets.links).filter(key => key !== 'total_links')
    result.data = {
      socialMedia:
        socialMedia &&
        socialMedia.map(key => ({
          id: uuid(),
          url: key,
          count: widgets && widgets.social_networks && widgets.social_networks[key]
        })),
      videos:
        videos &&
        videos.map(key => ({
          id: uuid(),
          count: widgets && widgets.video && widgets.video[key],
          name: widgets && widgets.video && widgets.video.video_subdata && widgets.video.video_subdata[key]
        })),
      links:
        links &&
        links.map(key => ({
          id: uuid(),
          url: key,
          count: widgets && widgets.links && widgets.links[key]
        }))
    }
    result.countVideos = widgets && widgets.video && widgets.video.total_video
    result.countSocialMedia = widgets && widgets.social_networks && widgets.social_networks.total_social_networks
    result.countLinks = widgets && widgets.links && widgets.links.total_links
  }

  return result
}

export const generateSummaryReportRequest = data => {
  const result = {}

  if (data) {
    const startDate = moment(data.dates[0])
    startDate.set('hour', 0)
    startDate.set('minute', 0)
    startDate.set('second', 0)

    const endDate = moment(data.dates[1])
    endDate.set('hour', 23)
    endDate.set('minute', 59)
    endDate.set('second', 59)

    result.to_datetime = moment.utc(endDate).format()
    result.from_datetime = moment.utc(startDate).format()
    result.products = (data.products && data.products) || []
    result.countries = (data.countries && data.countries) || []
    result.users_blacklist = (data.users_blacklist && data.users_blacklist) || []
  }

  return result
}
