import React from 'react'
import moment from 'moment'
import { getMomentLocale } from '../../../utils/helpers/date'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'date',
    dataIndex: 'date',
    title: 'Date',
    align: 'center',
    render: value => (
      <span>
        {(value &&
          moment(value)
            .locale(getMomentLocale())
            .format('lll')) ||
          '-'}
      </span>
    )
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'card',
    dataIndex: 'card',
    title: 'Card',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
