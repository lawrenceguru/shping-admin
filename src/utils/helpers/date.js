import { addHours, subHours, format, parse, setHours, setMinutes, setSeconds } from 'date-fns'
import moment from 'moment'

export const getLocaleDateFormat = () => {
  const formats = {
    'ar-SA': 'dd/MM/yy',
    'bg-BG': 'dd.M.yyyy',
    'ca-ES': 'dd/MM/yyyy',
    'zh-TW': 'yyyy/M/d',
    'cs-CZ': 'd.M.yyyy',
    'da-DK': 'dd-MM-yyyy',
    'de-DE': 'dd.MM.yyyy',
    'el-GR': 'd/M/yyyy',
    en: 'M/d/yyyy',
    'en-US': 'M/d/yyyy',
    'fi-FI': 'd.M.yyyy',
    'fr-FR': 'dd/MM/yyyy',
    'he-IL': 'dd/MM/yyyy',
    'hu-HU': 'yyyy. MM. dd.',
    'is-IS': 'd.M.yyyy',
    'it-IT': 'dd/MM/yyyy',
    'ja-JP': 'yyyy/MM/dd',
    'ko-KR': 'yyyy-MM-dd',
    'nl-NL': 'd-M-yyyy',
    'nb-NO': 'dd.MM.yyyy',
    'pl-PL': 'yyyy-MM-dd',
    'pt-BR': 'd/M/yyyy',
    'ro-RO': 'dd.MM.yyyy',
    ru: 'dd.MM.yyyy',
    'ru-RU': 'dd.MM.yyyy',
    'hr-HR': 'd.M.yyyy',
    'sk-SK': 'd. M. yyyy',
    'sq-AL': 'yyyy-MM-dd',
    'sv-SE': 'yyyy-MM-dd',
    'th-TH': 'd/M/yyyy',
    'tr-TR': 'dd.MM.yyyy',
    'ur-PK': 'dd/MM/yyyy',
    'id-ID': 'dd/MM/yyyy',
    'uk-UA': 'dd.MM.yyyy',
    'be-BY': 'dd.MM.yyyy',
    'sl-SI': 'd.M.yyyy',
    'et-EE': 'd.MM.yyyy',
    'lv-LV': 'yyyy.MM.dd.',
    lt: 'yyyy-MM-dd',
    'lt-LT': 'yyyy.MM.dd',
    'fa-IR': 'MM/dd/yyyy',
    'vi-VN': 'dd/MM/yyyy',
    'hy-AM': 'dd.MM.yyyy',
    'az-Latn-AZ': 'dd.MM.yyyy',
    'eu-ES': 'yyyy/MM/dd',
    'mk-MK': 'dd.MM.yyyy',
    'af-ZA': 'yyyy/MM/dd',
    'ka-GE': 'dd.MM.yyyy',
    'fo-FO': 'dd-MM-yyyy',
    'hi-IN': 'dd-MM-yyyy',
    'ms-MY': 'dd/MM/yyyy',
    'kk-KZ': 'dd.MM.yyyy',
    'ky-KG': 'dd.MM.yy',
    'sw-KE': 'M/d/yyyy',
    'uz-Latn-UZ': 'dd/MM yyyy',
    'tt-RU': 'dd.MM.yyyy',
    'pa-IN': 'dd-MM-yy',
    'gu-IN': 'dd-MM-yy',
    'ta-IN': 'dd-MM-yyyy',
    'te-IN': 'dd-MM-yy',
    'kn-IN': 'dd-MM-yy',
    'mr-IN': 'dd-MM-yyyy',
    'sa-IN': 'dd-MM-yyyy',
    'mn-MN': 'yy.MM.dd',
    'gl-ES': 'dd/MM/yy',
    'kok-IN': 'dd-MM-yyyy',
    'syr-SY': 'dd/MM/yyyy',
    'dv-MV': 'dd/MM/yy',
    'ar-IQ': 'dd/MM/yyyy',
    'zh-CN': 'yyyy/M/d',
    'de-CH': 'dd.MM.yyyy',
    'en-GB': 'dd/MM/yyyy',
    'es-MX': 'dd/MM/yyyy',
    'fr-BE': 'd/MM/yyyy',
    'it-CH': 'dd.MM.yyyy',
    'nl-BE': 'd/MM/yyyy',
    'nn-NO': 'dd.MM.yyyy',
    'pt-PT': 'dd-MM-yyyy',
    'sr-Latn-CS': 'd.M.yyyy',
    'sv-FI': 'd.M.yyyy',
    'az-Cyrl-AZ': 'dd.MM.yyyy',
    'ms-BN': 'dd/MM/yyyy',
    'uz-Cyrl-UZ': 'dd.MM.yyyy',
    'ar-EG': 'dd/MM/yyyy',
    'zh-HK': 'd/M/yyyy',
    'de-AT': 'dd.MM.yyyy',
    'en-AU': 'd/MM/yyyy',
    'es-ES': 'dd/MM/yyyy',
    'fr-CA': 'yyyy-MM-dd',
    'sr-Cyrl-CS': 'd.M.yyyy',
    'ar-LY': 'dd/MM/yyyy',
    'zh-SG': 'd/M/yyyy',
    'de-LU': 'dd.MM.yyyy',
    'en-CA': 'dd/MM/yyyy',
    'es-GT': 'dd/MM/yyyy',
    'fr-CH': 'dd.MM.yyyy',
    'ar-DZ': 'dd-MM-yyyy',
    'zh-MO': 'd/M/yyyy',
    'de-LI': 'dd.MM.yyyy',
    'en-NZ': 'd/MM/yyyy',
    'es-CR': 'dd/MM/yyyy',
    'fr-LU': 'dd/MM/yyyy',
    'ar-MA': 'dd-MM-yyyy',
    'en-IE': 'dd/MM/yyyy',
    'es-PA': 'MM/dd/yyyy',
    'fr-MC': 'dd/MM/yyyy',
    'ar-TN': 'dd-MM-yyyy',
    'en-ZA': 'yyyy/MM/dd',
    'es-DO': 'dd/MM/yyyy',
    'ar-OM': 'dd/MM/yyyy',
    'en-JM': 'dd/MM/yyyy',
    'es-VE': 'dd/MM/yyyy',
    'ar-YE': 'dd/MM/yyyy',
    'en-029': 'MM/dd/yyyy',
    'es-CO': 'dd/MM/yyyy',
    'ar-SY': 'dd/MM/yyyy',
    'en-BZ': 'dd/MM/yyyy',
    'es-PE': 'dd/MM/yyyy',
    'ar-JO': 'dd/MM/yyyy',
    'en-TT': 'dd/MM/yyyy',
    'es-AR': 'dd/MM/yyyy',
    'ar-LB': 'dd/MM/yyyy',
    'en-ZW': 'M/d/yyyy',
    'es-EC': 'dd/MM/yyyy',
    'ar-KW': 'dd/MM/yyyy',
    'en-PH': 'M/d/yyyy',
    'es-CL': 'dd-MM-yyyy',
    'ar-AE': 'dd/MM/yyyy',
    'es-UY': 'dd/MM/yyyy',
    'ar-BH': 'dd/MM/yyyy',
    'es-PY': 'dd/MM/yyyy',
    'ar-QA': 'dd/MM/yyyy',
    'es-BO': 'dd/MM/yyyy',
    'es-SV': 'dd/MM/yyyy',
    'es-HN': 'dd/MM/yyyy',
    'es-NI': 'dd/MM/yyyy',
    'es-PR': 'dd/MM/yyyy',
    'am-ET': 'd/M/yyyy',
    'tzm-Latn-DZ': 'dd-MM-yyyy',
    'iu-Latn-CA': 'd/MM/yyyy',
    'sma-NO': 'dd.MM.yyyy',
    'mn-Mong-CN': 'yyyy/M/d',
    'gd-GB': 'dd/MM/yyyy',
    'en-MY': 'd/M/yyyy',
    'prs-AF': 'dd/MM/yy',
    'bn-BD': 'dd-MM-yy',
    'wo-SN': 'dd/MM/yyyy',
    'rw-RW': 'M/d/yyyy',
    'qut-GT': 'dd/MM/yyyy',
    'sah-RU': 'MM.dd.yyyy',
    'gsw-FR': 'dd/MM/yyyy',
    'co-FR': 'dd/MM/yyyy',
    'oc-FR': 'dd/MM/yyyy',
    'mi-NZ': 'dd/MM/yyyy',
    'ga-IE': 'dd/MM/yyyy',
    'se-SE': 'yyyy-MM-dd',
    'br-FR': 'dd/MM/yyyy',
    'smn-FI': 'd.M.yyyy',
    'moh-CA': 'M/d/yyyy',
    'arn-CL': 'dd-MM-yyyy',
    'ii-CN': 'yyyy/M/d',
    'dsb-DE': 'd. M. yyyy',
    'ig-NG': 'd/M/yyyy',
    'kl-GL': 'dd-MM-yyyy',
    'lb-LU': 'dd/MM/yyyy',
    'ba-RU': 'dd.MM.yy',
    'nso-ZA': 'yyyy/MM/dd',
    'quz-BO': 'dd/MM/yyyy',
    'yo-NG': 'd/M/yyyy',
    'ha-Latn-NG': 'd/M/yyyy',
    'fil-PH': 'M/d/yyyy',
    'ps-AF': 'dd/MM/yy',
    'fy-NL': 'd-M-yyyy',
    'ne-NP': 'M/d/yyyy',
    'se-NO': 'dd.MM.yyyy',
    'iu-Cans-CA': 'd/M/yyyy',
    'sr-Latn-RS': 'd.M.yyyy',
    'si-LK': 'yyyy-MM-dd',
    'sr-Cyrl-RS': 'd.M.yyyy',
    'lo-LA': 'dd/MM/yyyy',
    'km-KH': 'yyyy-MM-dd',
    'cy-GB': 'dd/MM/yyyy',
    'bo-CN': 'yyyy/M/d',
    'sms-FI': 'd.M.yyyy',
    'as-IN': 'dd-MM-yyyy',
    'ml-IN': 'dd-MM-yy',
    'en-IN': 'dd-MM-yyyy',
    'or-IN': 'dd-MM-yy',
    'bn-IN': 'dd-MM-yy',
    'tk-TM': 'dd.MM.yy',
    'bs-Latn-BA': 'd.M.yyyy',
    'mt-MT': 'dd/MM/yyyy',
    'sr-Cyrl-ME': 'd.M.yyyy',
    'se-FI': 'd.M.yyyy',
    'zu-ZA': 'yyyy/MM/dd',
    'xh-ZA': 'yyyy/MM/dd',
    'tn-ZA': 'yyyy/MM/dd',
    'hsb-DE': 'd. M. yyyy',
    'bs-Cyrl-BA': 'd.M.yyyy',
    'tg-Cyrl-TJ': 'dd.MM.yy',
    'sr-Latn-BA': 'd.M.yyyy',
    'smj-NO': 'dd.MM.yyyy',
    'rm-CH': 'dd/MM/yyyy',
    'smj-SE': 'yyyy-MM-dd',
    'quz-EC': 'dd/MM/yyyy',
    'quz-PE': 'dd/MM/yyyy',
    'hr-BA': 'd.M.yyyy.',
    'sr-Latn-ME': 'd.M.yyyy',
    'sma-SE': 'yyyy-MM-dd',
    'en-SG': 'd/M/yyyy',
    'ug-CN': 'yyyy-M-d',
    'sr-Cyrl-BA': 'd.M.yyyy',
    'es-US': 'M/d/yyyy'
  }

  return formats[navigator.language] || 'dd/MM/yyyy'
}
export const SYSTEM_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'"

export const getTimezoneOffset = () => (new Date().getTimezoneOffset() / 60) * -1

export const setTimeZero = date => setHours(setMinutes(setSeconds(date, 0), 0), 0)

export const getDateNow = () => setTimeZero(new Date())

export const dateToUTC = date => addHours(date, getTimezoneOffset())

export const isString = v => typeof v === 'string' || v instanceof String

export const parseDate = (date, f, base = new Date()) => {
  return date && isString(date) ? parse(date, f || SYSTEM_DATETIME_FORMAT, base) : new Date()
}

export const formatDate = (date, options) => {
  const { outputFormat, parseFormat } = options || {}
  let toBeFormatted = date
  if (!date) return '-'
  if (isString(date)) toBeFormatted = parseDate(date, parseFormat)
  return format(toBeFormatted, outputFormat || getLocaleDateFormat())
}

export const formatDateTime = (date, options, isUserLocale = false) => {
  const { outputFormat, parseFormat } = options || {}
  let toBeFormatted = date
  if (!date) return '-'
  if (isString(date)) toBeFormatted = parseDate(date, parseFormat)
  if (isUserLocale) toBeFormatted.setHours(toBeFormatted.getHours() + getTimezoneOffset())
  return format(toBeFormatted, outputFormat || `${getLocaleDateFormat()} hh:mm a`)
}

export const formatDateToUTC = date => dateToUTC(parseDate(date))

export const formatUTCToApi = (date, isTime) => {
  const parsedDate = subHours(date, getTimezoneOffset())

  if (isTime) return parsedDate ? formatDateTime(parsedDate, { outputFormat: SYSTEM_DATETIME_FORMAT }) : '-'

  return parsedDate ? format(parsedDate, SYSTEM_DATETIME_FORMAT) : '-'
}

export const currDateFormat = () => {
  const locale = window.navigator.language
  moment.locale(locale.toLowerCase())
  return moment.localeData().longDateFormat('L')
}

export const getDataInFormatUTCToAPi = (
  date,
  formatConvertedDate,
  isCurrTime = true,
  isStartDay = false,
  isWithUtc = true
) => {
  const momentDate = moment(date, formatConvertedDate)
  const currDate = moment()
  if (!isCurrTime) {
    if (isStartDay) {
      currDate.set('hour', 0)
      currDate.set('minute', 0)
      currDate.set('second', 0)
    } else {
      currDate.set('hour', 23)
      currDate.set('minute', 59)
      currDate.set('second', 59)
    }
  }

  momentDate.set('hour', currDate.hour())
  momentDate.set('minute', currDate.minute())
  momentDate.set('second', currDate.second())
  const dateString = `${momentDate.format('YYYY-MM-DDTHH:mm:ss')}Z`

  return isWithUtc ? formatUTCToApi(parseDate(moment.utc(dateString).format())) : dateString
}

export const monthsToData = (months, from, to, key) => {
  return months.map(({ year, month }, index) => ({
    date: moment()
      .year(year)
      .month(month - 1),
    [key]: months[index][key]
  }))
}

export const weeksToData = (weeks, from, to, key) => {
  return weeks.map(({ year, week }, index) => ({
    date: moment()
      .year(year)
      .week(week),
    [key]: weeks[index][key]
  }))
}

export const daysToData = (days, from, to, key) => {
  return days.map(({ year, month, day }, index) => ({
    date: moment()
      .year(year)
      .month(month - 1)
      .date(day),
    [key]: days[index][key]
  }))
}

const serverDateMapping = {
  days: daysToData,
  weeks: weeksToData,
  months: monthsToData
}
export const processServerDate = (data, interval, from, to, key) => {
  return data ? serverDateMapping[interval](data, from, to, key) : []
}

export const getMomentLocale = () => {
  const momentLocales = {
    en: 'en',
    ru: 'ru',
    zh: 'zh-cn'
  }
  const currLocale = localStorage.getItem('lang')

  return momentLocales[currLocale]
}

export const getDatePickerLocale = () => {
  const pickerLocales = {
    en: 'enGB',
    ru: 'ruRU',
    zh: 'zhCN'
  }
  const currLocale = localStorage.getItem('lang')

  return pickerLocales[currLocale]
}
