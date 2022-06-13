import { getDateNow, formatDate } from '../../../utils/helpers/date'

export const formatDays = {
  fns: 'MMM-dd',
  moment: 'MMM-DD'
}

export const colors = [
  '#50d166',
  '#DC143C',
  '#1875f0',
  '#68228B',
  '#f7cb4e',
  '#ff1493',
  '#00f5ff',
  '#ff4500',
  '#ffdead',
  '#808000',
  '#00fa9a',
  '#ff4500',
  '#ffdead',
  '#808000',
  '#00fa9a'
]

export const initialDates = [
  formatDate(new Date(getDateNow().getFullYear(), getDateNow().getMonth(), 1), {
    outputFormat: 'yyyy-MM-dd'
  }),
  formatDate(getDateNow(), { outputFormat: 'yyyy-MM-dd' })
]

export const labels = {
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#808080'
  }
}
