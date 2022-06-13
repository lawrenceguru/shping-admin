import intl from 'react-intl-universal'
import { AGE_MARKS } from '../TodoDeliveryEditor/consts'

export const rewardsGenderOptions = [
  { value: 'any', label: intl.get('campaigns.rewards.form.genderOptionAny') },
  { value: 'male', label: intl.get('campaigns.rewards.form.genderOptionMale') },
  { value: 'female', label: intl.get('campaigns.rewards.form.genderOptionFemale') },
  { value: 'other', label: intl.get('campaigns.rewards.form.genderOptionOther') }
]

export const rewardsAgeRangeOptions = [
  { value: [13, 17], label: intl.get('campaigns.rewards.form.ageOption1') },
  { value: [18, 24], label: intl.get('campaigns.rewards.form.ageOption2') },
  { value: [25, 34], label: intl.get('campaigns.rewards.form.ageOption3') },
  { value: [35, 54], label: intl.get('campaigns.rewards.form.ageOption4') },
  { value: [55, 64], label: intl.get('campaigns.rewards.form.ageOption5') },
  { value: [65], label: intl.get('campaigns.rewards.form.ageOption6') }
]

export const rewardsShpingLevels = [
  { value: 'basic', label: intl.get('campaigns.rewards.form.levels.basic') },
  { value: 'bronze', label: intl.get('campaigns.rewards.form.levels.bronze') },
  { value: 'silver', label: intl.get('campaigns.rewards.form.levels.silver') },
  { value: 'gold', label: intl.get('campaigns.rewards.form.levels.gold') },
  { value: 'platinum', label: intl.get('campaigns.rewards.form.levels.platinum') },
  { value: 'ambassador', label: intl.get('campaigns.rewards.form.levels.ambassador') }
]

export const rewardsTimeRestrictionOptions = [
  {
    value: 'once',
    label: intl.get('campaigns.rewards.form.conditionOption1')
  },
  {
    value: 'daily',
    label: intl.get('campaigns.rewards.form.conditionOption2')
  },
  {
    value: 'weekly',
    label: intl.get('campaigns.rewards.form.conditionOption3')
  },
  {
    value: 'monthly',
    label: intl.get('campaigns.rewards.form.conditionOption4')
  }
]

export const optionsForFilters = [
  {
    columnName: intl.get('campaigns.rewards.filters.condition'),
    fieldId: 'condition',
    type: 'select',
    placeholder: intl.get('campaigns.rewards.filters.conditionPlaceholder'),
    options: rewardsTimeRestrictionOptions
  },
  {
    columnName: intl.get('campaigns.rewards.filters.gender'),
    fieldId: 'gender',
    type: 'select',
    placeholder: intl.get('campaigns.rewards.filters.genderPlaceholder'),
    options: rewardsGenderOptions
  },
  {
    columnName: intl.get('campaigns.rewards.filters.userLevels'),
    fieldId: 'userLevels',
    type: 'select',
    placeholder: intl.get('campaigns.rewards.filters.userLevelsPlaceholder'),
    options: rewardsShpingLevels
  },
  {
    columnName: intl.get('campaigns.rewards.filters.age'),
    fieldId: 'age',
    type: 'slider',
    options: AGE_MARKS
  }
]
export const defaultInitialStateFilters = {
  action: {
    value: ''
  },
  dates: {
    value: []
  }
}
