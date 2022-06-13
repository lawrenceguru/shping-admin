import intl from 'react-intl-universal'
// eslint-disable-next-line import/prefer-default-export
export const options = {
  header: intl.get('campaigns.featured.summary.summaryHeading'),
  sections: {
    1: [
      {
        name: 'name',
        label: intl.get('campaigns.featured.summary.name')
      },
      {
        name: 'status',
        intlValue: true,
        path: 'campaigns.featured',
        label: intl.get('campaigns.featured.summary.status')
      }
    ],
    2: [
      {
        name: 'dates',
        type: 'datesRange',
        label: intl.get('campaigns.featured.summary.date')
      },
      {
        name: 'run_time',
        type: 'time',
        label: intl.get('campaigns.featured.summary.time')
      },
      {
        name: 'options',
        type: 'bool',
        label: intl.get('campaigns.featured.summary.evenDisrtibution')
      }
    ],
    3: [
      {
        name: 'countries',
        type: 'audience',
        label: intl.get('campaigns.featured.summary.countries')
      },
      {
        name: 'languages',
        type: 'audience',
        label: intl.get('campaigns.featured.summary.languages')
      },
      {
        name: 'gender',
        type: 'audience',
        label: intl.get('campaigns.featured.summary.gender')
      },
      {
        name: 'ageRange',
        type: 'audience',
        label: intl.get('campaigns.featured.summary.age')
      },
      {
        name: 'user_levels',
        type: 'audience',
        label: intl.get('campaigns.featured.summary.levels')
      }
    ]
  }
}
