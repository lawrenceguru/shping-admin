import moment from 'moment'
import { getDataInFormatUTCToAPi, formatDate } from './helpers/date'
import { isAudienceEmpty } from './campaign'

const audienceInitial = {
  countries: [],
  languages: [],
  gender: 'any',
  ageRange: [],
  max_age: '',
  min_age: '',
  user_levels: [],
  advanced: {
    weekly_scans: { from: '', to: '', inverse: false },
    brand_scans: { scans_from: '', scans_to: '', date_from: null, date_to: null, inverse: false },
    scan_countries: { list: [], inverse: false },
    last_scan_date: { date: '', inverse: false }
  }
}

// const isAdvancedEmpty = ({
//   weekly_scans: weeklyScans,
//   brand_scans: brandScans,
//   scan_countries: scanCountries,
//   scan_date: scanDate
// }) => {
//   return (
//     !weeklyScans &&
//     !weeklyScans.from &&
//     !weeklyScans.to &&
//     !brandScans.from &&
//     !brandScans.to &&
//     !brandScans.start_date &&
//     !brandScans.end_date &&
//     !scanCountries &&
//     !scanDate
//   )
// }

export const generateCreateShoutoutRequest = data => {
  const {
    name,
    status,
    products,
    locations,
    languages,
    countries: reCountries,
    user_levels: reUserLevels,
    weekly_scans: reWeelyScans,
    last_scan_date: reLastScanDate,
    brand_scans: brandScans,
    gender,
    max_age: max,
    min_age: min,
    // scan_date_inverse: scanDateInverse,
    // scan_countries_inverse: scanCountriesInverse,
    count,
    delay,
    copy
  } = data

  return {
    ...(name && { name }),
    ...(count && { count: Number(count) }),
    ...(delay && { delay: Number(delay) }),
    ...(copy && { copy }),
    ...{ status: status ? 'active' : 'inactive' },
    ...(data.start_date && { start_date: getDataInFormatUTCToAPi(data.start_date, 'M/D/YYYY', true, false) }),
    ...(data.end_date && { end_date: getDataInFormatUTCToAPi(data.end_date, 'M/D/YYYY', false, false) }),
    ...{ products: products || [] },
    ...(locations && locations.length > 0 && { locations }),
    ...(!isAudienceEmpty(data) && {
      audience: {
        ...(languages && languages.length > 0 && { languages }),
        ...(reUserLevels && reUserLevels.length > 0 && { user_levels: reUserLevels }),
        ...(max && { max_age: Number(max) }),
        ...(min && { min_age: Number(min) }),
        ...(gender && gender !== 'any' && { gender }),
        ...{
          advanced: {
            ...(reCountries &&
              reCountries.list &&
              reCountries.list.length > 0 && {
                countries: {
                  list: reCountries.list,
                  ...(reCountries.inverse && { inverse: reCountries.inverse })
                }
              }),
            ...(reLastScanDate &&
              reLastScanDate.date && {
                last_scan_date: {
                  date: getDataInFormatUTCToAPi(reLastScanDate.date, 'YYYY/MM/DD', false, true),
                  ...(reLastScanDate.inverse && { inverse: reLastScanDate.inverse })
                }
              }),
            ...(reWeelyScans &&
              (reWeelyScans.from || reWeelyScans.to) && {
                weekly_scans: {
                  ...(reWeelyScans.from && {
                    from: Number(reWeelyScans.from)
                  }),
                  ...(reWeelyScans.to && {
                    to: Number(reWeelyScans.to)
                  }),
                  ...(reWeelyScans.inverse && { inverse: reWeelyScans.inverse })
                }
              }),
            ...(brandScans &&
              brandScans.scans_from &&
              brandScans.scans_to &&
              brandScans.date_from &&
              brandScans.date_to && {
                brand_scans: {
                  ...(brandScans.scans_from && {
                    scans_from: Number(brandScans.scans_from)
                  }),
                  ...(brandScans.scans_to && {
                    scans_to: Number(brandScans.scans_to)
                  }),
                  ...(brandScans.date_from && {
                    date_from: getDataInFormatUTCToAPi(brandScans.date_from, 'YYYY/MM/DD', false, true)
                  }),
                  ...(brandScans.date_to && {
                    date_to: getDataInFormatUTCToAPi(brandScans.date_to, 'YYYY/MM/DD', false, true)
                  }),
                  ...(brandScans.inverse && { inverse: brandScans.inverse })
                }
              })
          }
        }
      }
    })
  }
}

export const getShoutoutsFormValues = (data, duplicateId) => {
  if (data) {
    const { id, audience, locations, ...shoutout } = data
    let shoutoutName = shoutout.name

    if (duplicateId) {
      shoutoutName = shoutoutName.includes('copy')
        ? shoutoutName.substr(0, shoutoutName.indexOf('copy') + 4)
        : `${shoutoutName} copy`
    }

    const selectedShoutout = {
      id,
      name: shoutoutName,
      count: shoutout.count || null,
      delay: shoutout.delay || null,
      copy: shoutout.copy || '',
      status: shoutout.status === 'active',
      start_date: (shoutout.start_date && moment(shoutout.start_date, 'YYYY-MM-DD').format('M/D/YYYY')) || null,
      ...(shoutout.end_date && { end_date: moment(shoutout.end_date, 'YYYY-MM-DD').format('M/D/YYYY') }),
      products: shoutout.products || [],
      shoutoutTiming: (shoutout.start_date && 'setData') || 'immediately'
    }

    if (audience) {
      selectedShoutout.audience = { ...audienceInitial, ...audience }
      const ageRange = []
      if (selectedShoutout.audience.min_age) {
        ageRange.push(selectedShoutout.audience.min_age)
        // delete selectedShoutout.audience.min_age
      } else {
        ageRange.push(0)
      }

      if (selectedShoutout.audience.max_age) {
        ageRange.push(selectedShoutout.audience.max_age === 100 ? 75 : selectedShoutout.audience.max_age)
        // delete selectedShoutout.audience.max_age
      } else {
        ageRange.push(ageRange[0] ? ageRange[0] : 0)
      }
      if (selectedShoutout.audience.user_level) {
        selectedShoutout.audience.user_levels = selectedShoutout.audience.user_level
      }
      selectedShoutout.audience.ageRange = ageRange
      console.log(formatDate)
      // if (selectedShoutout.audience.advanced) {
      //   const {
      //     countries,
      //     brand_scans: brandScans,
      //     weekly_scans: weeklyScans,
      //     last_scan_date: lastScaneDate
      //   } = selectedShoutout.audience.advanced

      //   if (countries) {
      //     selectedShoutout.audience.advanced.countries = countries.list || []
      //     selectedShoutout.audience.advanced.countries_inverse = !!countries.inverse
      //   }

      //   if (lastScaneDate) {
      //     selectedShoutout.audience.advanced.last_scan_date = formatDate(lastScaneDate.date, {
      //       outputFormat: 'M/d/yyyy'
      //     })
      //     selectedShoutout.audience.advanced.last_scan_date.inverse = !!lastScaneDate.inverse
      //   }

      //   if (weeklyScans) {
      //     selectedShoutout.audience.advanced.weekly_scans.from = weeklyScans.from
      //     selectedShoutout.audience.advanced.weekly_scans.to = weeklyScans.to
      //     selectedShoutout.audience.advanced.weekly_scans.inverse = !!weeklyScans.inverse
      //   }

      //   if (brandScans) {
      //     selectedShoutout.audience.advanced.brand_scans.scans_from = brandScans.scans_from
      //     selectedShoutout.audience.advanced.brand_scans.scans_to = brandScans.scans_to
      //     selectedShoutout.audience.advanced.brand_scans.date_from = formatDate(brandScans.date_from, {
      //       outputFormat: 'M/d/yyyy'
      //     })
      //     selectedShoutout.audience.advanced.brand_scans.date_to = formatDate(brandScans.date_to, {
      //       outputFormat: 'M/d/yyyy'
      //     })
      //     selectedShoutout.audience.advanced.brand_scans.inverse = !!brandScans.inverse
      //   }
      //   // delete selectedShoutout.audience.advanced
      // }
    } else {
      selectedShoutout.audience = { ...audienceInitial }
    }
    if (locations) {
      selectedShoutout.locations = locations
    }
    return selectedShoutout
  }
  return null
}
