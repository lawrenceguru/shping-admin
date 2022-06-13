import intl from 'react-intl-universal'
import { impressionsFields, interactionsFields } from '../../../utils/analytics'

export const rangeEnum = {
  get_days: 'daily',
  get_weeks: 'weekly',
  get_months: 'monthly'
}

export const plotOptions = {
  showInLegend: true
}

export const tooltipData = {
  scans: [intl.get('overviewPage.scanTooltip')],
  users: [intl.get('overviewPage.usersTooltip')],
  interactions: interactionsFields.map(nameField => [`• ${intl.get(`overviewPage.interactionsTooltip.${nameField}`)}`]),
  impressions: impressionsFields.map(nameField => [
    `• ${intl.get(`conversionPage.impressions.fieldsNames.${nameField}`)}`
  ])
}
