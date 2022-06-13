import intl from 'react-intl-universal'

export const formatMap = {
  days: {
    fns: 'MMM-dd',
    moment: 'MMM-DD'
  },
  weeks: {
    fns: 'MMM-dd',
    moment: 'MMM-DD'
  },
  months: {
    fns: 'yyyy-MMM',
    moment: 'YYYY-MMM'
  }
}

export const labels = {
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#808080'
  }
}

export const filterData = [
  { label: intl.get('overviewPage.daily'), value: 'days' },
  { label: intl.get('overviewPage.weekly'), value: 'weeks' },
  { label: intl.get('overviewPage.monthly'), value: 'months' }
]

export const key = intl.get('campaigns.rewards.chartRewards.key')
