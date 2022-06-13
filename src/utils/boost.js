import moment from 'moment'
import { getDataInFormatUTCToAPi } from './helpers/date'

export const getDataFromBoost = boost => {
  const audienceInitial = {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: []
  }
  const {
    name,
    audience,
    status,
    products,
    limit,
    level,
    period_min: periodMin,
    first_scan: firstScan,
    buddy_invite: buddyInvite
  } = boost
  const data = {
    name,
    limit,
    level,
    period_min: periodMin,
    first_scan: firstScan,
    status,
    products
  }

  if (boost.start_date) {
    data.start_date = moment(boost.start_date, 'YYYY-MM-DD').format('M/D/YYYY')
  }

  if (boost.end_date) {
    data.end_date = moment(boost.end_date, 'YYYY-MM-DD').format('M/D/YYYY')
  }

  if (boost.stop_date) {
    data.stop_date = moment(boost.stop_date, 'YYYY-MM-DD').format('M/D/YYYY')
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

  if (buddyInvite) {
    data.method = 'invite'
    data.buddy_invite = { ...buddyInvite }
  } else {
    data.method = 'scan'
  }

  if (status === 'active' && !(moment().diff(moment(data.end_date)) > 0)) {
    data.isReadOnly = true
  }

  return data
}
export const generateBoostRequest = data => {
  const {
    name,
    start_date: startDate,
    end_date: endDate,
    limit,
    level,
    products,
    // countries,
    // ageRange,
    // gender,
    // languages,
    status,
    period_min: periodMin,
    stop_date: stopDate,
    first_scan: firstScan,
    method,
    buddy_invite: buddyInvite
  } = data

  return {
    name,
    ...(data.locations &&
      data.locations !== undefined &&
      data.locations.length > 0 && {
        locations: data.locations
      }),
    ...(startDate && { start_date: getDataInFormatUTCToAPi(startDate, 'M/D/YYYY', false, true) }),
    ...(startDate && { end_date: getDataInFormatUTCToAPi(endDate, 'M/D/YYYY', false, false) }),
    ...(limit && { limit: Number(limit) }),
    ...(stopDate && {
      stop_date: getDataInFormatUTCToAPi(stopDate, 'M/D/YYYY', false, false)
    }),
    audience: {
      // ...(countries && { countries }),
      // ...(languages && { languages }),
      ...(data.audience.languages &&
        data.audience.languages.length > 0 && {
          languages: data.audience.languages
        }),
      ...(data.audience.min_age && { min_age: Number(data.audience.min_age) }),
      ...(data.audience.max_age && { max_age: Number(data.audience.max_age) }),
      ...(data.audience.gender && data.audience.gender !== 'any' && { gender: data.audience.gender }),
      ...(data.audience.user_levels &&
        data.audience.user_levels.length > 0 && {
          user_levels: data.audience.user_levels
        })
    },
    status: status || 'inactive',
    ...(method === 'invite'
      ? {
          buddy_invite: {
            ...buddyInvite,
            max_repeat: parseInt(buddyInvite.max_repeat, 10)
          }
        }
      : {
          period_min: Number(periodMin) * 24 * 60,
          ...(level && { level }),
          ...(products &&
            products.length !== 0 && {
              products
            }),
          first_scan: !!firstScan
        })
  }
}
