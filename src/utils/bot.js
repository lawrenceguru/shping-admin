import moment from 'moment'
import { formatDate, getDataInFormatUTCToAPi } from './helpers/date'
// import { isAudienceEmpty } from './campaign'

const audienceInitial = {
  languages: [],
  countries: [],
  gender: 'any',
  ageRange: [],
  registration_methods: [],
  weekly_scans: { from: '', to: '' },
  scan_countries: [],
  scan_date: ''
}

export const generateCreateBotRequest = data => {
  const {
    name,
    status,
    products,
    // countries,
    // languages,
    // scan_countries: scanCountries,
    // registration_methods: registrationMethods,
    // weekly_scans: { from, to },
    // scan_date: scanDate,
    // gender,
    // ageRange,
    locations,
    // languages,
    // user_levels: reUserLevels,
    // gender,
    // max_age: max,
    // min_age: min,
    mediaScans,
    textScans
  } = data

  return {
    ...(name && { name }),
    ...{ status: status ? 'active' : 'inactive' },
    ...(data.start_date && { start_date: getDataInFormatUTCToAPi(data.start_date, 'M/D/YYYY', true, false) }),
    ...(data.end_date && { end_date: getDataInFormatUTCToAPi(data.end_date, 'M/D/YYYY', false, false) }),
    ...{ products: products || [] },
    ...(locations && locations.length > 0 && { locations }),
    ...(data.audience && {
      audience: {
        // ...(countries && { countries }),
        ...(data.audience.languages && data.audience.languages.length > 0 && { languages: data.audience.languages }),
        ...(data.audience.user_levels && { user_levels: data.audience.user_levels }),
        ...(data.audience.max_age && { max_age: Number(data.audience.max_age) }),
        ...(data.audience.min_age && { min_age: Number(data.audience.min_age) }),
        ...(data.audience.gender && data.audience.gender !== 'any' && { gender: data.audience.gender }),
        ...(data.audience.scan_countries &&
          data.audience.scan_countries.length > 0 && {
            scan_countries: data.audience.scan_countries
          }),
        ...(data.audience.registration_methods &&
          data.audience.registration_methods.length > 0 && {
            registration_methods: data.audience.registration_methods
          }),
        ...(data.audience.last_scan_date && {
          last_scan_date: data.audience.last_scan_date
        }),
        ...(data.audience.weekly_scans &&
          (data.audience.weekly_scans.from || data.audience.weekly_scans.to) && {
            weekly_scans: {
              ...(data.audience.weekly_scans.from && {
                from: Number(data.audience.weekly_scans.from)
              }),
              ...(data.audience.weekly_scans.to && {
                to: Number(data.audience.weekly_scans.to)
              })
            }
          })
      }
    }),
    ...(textScans &&
      textScans.length && {
        text_widgets: textScans.map(({ content, title }) => ({
          text: {
            title,
            text: content
          }
        }))
      }),
    ...(mediaScans &&
      mediaScans.length && {
        media_widgets: mediaScans.map(media => {
          const { title, url, preview } = media
          if (media.type.includes('image')) {
            return {
              image: [{ title, url }]
            }
          }
          return {
            video: {
              title,
              url,
              preview
            }
          }
        })
      })
  }
}

export const getBotsFormValues = (data, duplicateId) => {
  if (data) {
    const { id, audience, locations, ...bot } = data
    let botName = bot.name

    if (duplicateId) {
      botName = botName.includes('copy') ? botName.substr(0, botName.indexOf('copy') + 4) : `${botName} copy`
    }

    const selectedBot = {
      id,
      name: botName,
      status: bot.status === 'active',
      start_date: (bot.start_time && moment(bot.start_time, 'YYYY-MM-DD').format('M/D/YYYY')) || null,
      ...(bot.end_time && { end_date: moment(bot.end_time, 'YYYY-MM-DD').format('M/D/YYYY') }),
      products: bot.products || [],
      botTiming: (bot.start_time && 'setData') || 'immediately'
    }

    if (audience) {
      selectedBot.audience = { ...audienceInitial, ...audience }
      const ageRange = []
      if (selectedBot.audience.min_age) {
        ageRange.push(selectedBot.audience.min_age)
        delete selectedBot.audience.min_age
      } else {
        ageRange.push(0)
      }

      if (selectedBot.audience.max_age) {
        ageRange.push(selectedBot.audience.max_age === 100 ? 75 : selectedBot.audience.max_age)
        delete selectedBot.audience.max_age
      } else {
        ageRange.push(ageRange[0] ? ageRange[0] : 0)
      }

      selectedBot.audience.ageRange = ageRange

      if (selectedBot.audience.last_scan_date) {
        selectedBot.audience.scan_date = formatDate(selectedBot.audience.last_scan_date, {
          parseFormat: 'yyyy-MM-dd',
          outputFormat: 'M/d/yyyy'
        })
        delete selectedBot.audience.last_scan_date
      }
    } else {
      selectedBot.audience = { ...audienceInitial }
    }
    if (locations) {
      selectedBot.locations = locations
    }
    if (audience) {
      const newAudience = { ...audienceInitial, ...audience }
      selectedBot.audience = { ...newAudience }
    }
    if (bot.media_widgets) {
      selectedBot.mediaScans = bot.media_widgets.map(media => {
        const key = Object.keys(media)[0]
        const { url, title, preview } = Array.isArray(media[key]) ? media[key][0] : media[key]
        return {
          url,
          type: key,
          title,
          ...(preview && { preview })
        }
      })
    }

    if (bot.text_widgets) {
      selectedBot.textScans = bot.text_widgets.map(media => {
        return {
          content: media.text.text,
          title: media.text.title
        }
      })
    }

    return selectedBot
  }
  return null
}
