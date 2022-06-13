import intl from 'react-intl-universal'
// eslint-disable-next-line import/prefer-default-export
export const initialValues = {
  dates: [],
  products: [],
  countries: [],
  users_blacklist: []
}

export const fields = [
  {
    name: 'dates',
    type: 'rangePicker',
    label: intl.get('campaigns.summaryReports.dateInterval'),
    disabledDate: () => false,
    rules: { validate: value => (!value || !value.length ? intl.get('todo.cards.form.required') : true) }
  },
  {
    name: 'countries',
    type: 'countries',
    label: intl.get('campaigns.summaryReports.labelCountries'),
    placeholder: intl.get('campaigns.summaryReports.selectCountries')
  },
  {
    name: 'users_blacklist',
    type: 'users',
    label: intl.get('campaigns.summaryReports.usersBlacklist'),
    placeholder: intl.get('campaigns.summaryReports.selectUsers')
  },
  {
    name: 'products',
    type: 'products',
    label: intl.get('campaigns.summaryReports.labelProducts'),
    placeholder: intl.get('campaigns.summaryReports.selectProducts')
  }
]

export const sectionOptions = {
  header: intl.get('campaigns.tabs.summary'),
  sections: {
    1: [
      {
        name: 'dates',
        type: 'datesRange',
        label: intl.get('campaigns.featured.summary.date')
      }
    ],
    2: [
      {
        name: 'countries',
        label: intl.get('campaigns.summaryReports.item.countriesSummary'),
        type: 'array'
      }
    ],
    3: [
      {
        name: 'users_blacklist',
        label: intl.get('campaigns.summaryReports.item.usersBlacklistSummary'),
        type: 'array'
      }
    ],
    4: [
      {
        name: 'products',
        label: intl.get('campaigns.summaryReports.item.productsSummary'),
        type: 'array'
      }
    ]
  }
}
