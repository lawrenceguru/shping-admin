import React from 'react'
import intl from 'react-intl-universal'
import { formatDate } from '../../../utils/helpers/date'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: intl.get('campaigns.featured.bodyTab1.tableHeader1'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: intl.get('campaigns.featured.bodyTab1.tableHeader2'),
    align: 'center',
    render: value => <span>{(value && intl.get(`campaigns.featured.${value}`)) || '-'}</span>
  },
  {
    key: 'start_date',
    dataIndex: 'start_date',
    title: intl.get('campaigns.featured.bodyTab1.tableHeader3'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'end_date',
    dataIndex: 'end_date',
    title: intl.get('campaigns.featured.bodyTab1.tableHeader4'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  }
]
