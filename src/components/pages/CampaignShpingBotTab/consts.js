import intl from 'react-intl-universal'
import { AGE_MARKS } from '../TodoDeliveryEditor/consts'
import { rewardsGenderOptions } from '../CampaignRewardsTab/consts'

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'startDate',
    type: 'datePicker',
    columnName: 'Date Picker',
    format: 'M/D/YYYY',
    placeholder: intl.get('trackAndTrace.inventory.startDate')
  },
  {
    fieldId: 'endDate',
    type: 'datePicker',
    columnName: 'Date Picker',
    format: 'M/D/YYYY',
    placeholder: intl.get('trackAndTrace.inventory.endDate')
  }
]

const registrationTypes = [
  {
    value: 'facebook',
    label: intl.get('campaigns.rewards.form.registrationOption1')
  },
  {
    value: 'email',
    label: intl.get('campaigns.rewards.form.registrationOption2')
  }
]

export const optionsForFilters = [
  {
    columnName: intl.get('campaigns.bot.filters.registration'),
    fieldId: 'registration_methods',
    type: 'select',
    placeholder: intl.get('campaigns.bot.filters.registrationPlaceholder'),
    options: registrationTypes
  },
  {
    columnName: intl.get('campaigns.rewards.filters.gender'),
    fieldId: 'gender',
    type: 'select',
    placeholder: intl.get('campaigns.rewards.filters.genderPlaceholder'),
    options: rewardsGenderOptions
  },
  {
    columnName: intl.get('campaigns.rewards.filters.age'),
    fieldId: 'age',
    type: 'slider',
    options: AGE_MARKS
  }
]

export const defaultInitialStateFilters = {
  startDate: {
    value: '',
    option: true
  },
  endDate: {
    value: '',
    option: true
  }
}
