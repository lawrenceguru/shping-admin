import moment from 'moment'
// import { isAudienceEmpty } from './campaign'

export const generateReminderRequest = data => {
  const {
    name,
    start_date: startDate,
    start_time: startTime,
    frequency,
    customDays,
    messages,
    // countries,
    // ageRange,
    // gender,
    // languages,
    status
  } = data

  return {
    ...(data.locations &&
      data.locations.length > 0 && {
        locations: data.locations
      }),
    name,
    ...(messages && { messages }),
    run_options: {
      ...(startDate && { start_date: moment(startDate, 'M/D/YYYY').format('YYYY-MM-DD') }),
      ...(startTime && {
        start_time: moment(startTime, 'h:mm A')
          .locale('ru')
          .format('LTS')
      }),
      ...(frequency && frequency !== 'custom'
        ? {
            frequency
          }
        : {
            custom_days: customDays.map(day => Number(day))
          })
    },
    // ...(!isAudienceEmpty(data) && {
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
    // }),
    status: status || 'inactive'
  }
}

export const getDataFromReminder = boost => {
  const audienceInitial = {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: []
  }
  const { name, audience, status, run_options: runOptions, messages } = boost
  const data = {
    name,
    audience,
    status,
    messages
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

  if (runOptions) {
    data.run_options = {
      ...(runOptions.start_date && { start_date: moment(runOptions.start_date, 'YYYY-MM-DD').format('M/D/YYYY') }),
      ...(runOptions.start_time && {
        start_time: moment(runOptions.start_time, 'hh:mm:ss')
          .locale('ru')
          .format('LT')
      }),
      ...{ frequency: runOptions.frequency ? runOptions.frequency : 'custom' }
    }

    if (runOptions.custom_days) {
      data.customDays = runOptions.custom_days.map(item => String(item))
    }
  }

  return data
}
