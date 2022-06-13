import intl from 'react-intl-universal'

export const links = [
  {
    key: 'url',
    dataIndex: 'url',
    title: intl.get('campaigns.summaryReports.links.url'),
    align: 'center'
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: intl.get('campaigns.summaryReports.links.count'),
    align: 'center'
  }
]

export const video = [
  {
    key: 'name',
    dataIndex: 'name',
    title: intl.get('campaigns.summaryReports.video.name'),
    align: 'center'
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: intl.get('campaigns.summaryReports.video.count'),
    align: 'center'
  }
]

export const socialMedia = [
  {
    key: 'url',
    dataIndex: 'url',
    title: intl.get('campaigns.summaryReports.socialMedia.url'),
    align: 'center'
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: intl.get('campaigns.summaryReports.socialMedia.count'),
    align: 'center'
  }
]
