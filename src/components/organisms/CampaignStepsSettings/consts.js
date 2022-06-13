import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const rewardsIntervalOptions = [
  {
    value: 'day',
    label: intl.get('campaigns.rewards.form.budgetOption2'),
    input: intl.get('campaigns.rewards.form.budgetMaximumTitle2'),
    summary: intl.get('campaigns.rewards.form.budgetSummaryText2')
  },
  {
    value: 'week',
    label: intl.get('campaigns.rewards.form.budgetOption3'),
    input: intl.get('campaigns.rewards.form.budgetMaximumTitle3'),
    summary: intl.get('campaigns.rewards.form.budgetSummaryText3')
  },
  {
    value: 'month',
    label: intl.get('campaigns.rewards.form.budgetOption4'),
    input: intl.get('campaigns.rewards.form.budgetMaximumTitle4'),
    summary: intl.get('campaigns.rewards.form.budgetSummaryText4')
  }
]

export const restrictionGroup = [
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
