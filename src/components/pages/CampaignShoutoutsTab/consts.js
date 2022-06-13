import intl from 'react-intl-universal'
import { AGE_MARKS } from '../TodoDeliveryEditor/consts'
import { rewardsGenderOptions } from '../CampaignRewardsTab/consts'

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'start_date',
    type: 'datePicker',
    columnName: 'Date Picker',
    format: 'YYYY-M-D',
    placeholder: intl.get('trackAndTrace.inventory.startDate')
  },
  {
    fieldId: 'end_date',
    type: 'datePicker',
    columnName: 'Date Picker',
    format: 'YYYY-M-D',
    placeholder: intl.get('trackAndTrace.inventory.endDate')
  }
]

export const rewardsShpingLevels = [
  { value: 'basic', label: intl.get('campaigns.rewards.form.levels.basic') },
  { value: 'bronze', label: intl.get('campaigns.rewards.form.levels.bronze') },
  { value: 'silver', label: intl.get('campaigns.rewards.form.levels.silver') },
  { value: 'gold', label: intl.get('campaigns.rewards.form.levels.gold') },
  { value: 'platinum', label: intl.get('campaigns.rewards.form.levels.platinum') }
]

export const statusOptiuons = [
  { value: 'active', label: intl.get('campaigns.shoutouts.statusOptions.active') },
  { value: 'inactive', label: intl.get('campaigns.shoutouts.statusOptions.inactive') }
]

export const optionsForFilters = [
  {
    columnName: intl.get('campaigns.shoutouts.filters.status'),
    fieldId: 'status',
    type: 'select',
    placeholder: intl.get('campaigns.shoutouts.filters.statusPlaceholder'),
    options: statusOptiuons
  },
  {
    columnName: intl.get('campaigns.shoutouts.filters.gender'),
    fieldId: 'gender',
    type: 'select',
    placeholder: intl.get('campaigns.shoutouts.filters.genderPlaceholder'),
    options: rewardsGenderOptions
  },
  {
    columnName: intl.get('campaigns.shoutouts.filters.userLevels'),
    fieldId: 'user_levels',
    type: 'select',
    mode: 'multiple',
    placeholder: intl.get('campaigns.shoutouts.filters.userLevelsPlaceholder'),
    options: rewardsShpingLevels
  },
  {
    columnName: 'empty',
    fieldId: 'empty',
    type: 'empty'
  },
  {
    columnName: intl.get('campaigns.shoutouts.filters.age'),
    fieldId: 'age',
    type: 'slider',
    options: AGE_MARKS
  }
]

export const defaultInitialStateFilters = {
  start_date: {
    value: '',
    option: true
  },
  end_date: {
    value: '',
    option: true
  }
}
