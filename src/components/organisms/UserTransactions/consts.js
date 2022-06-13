import React from 'react'
import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'ts',
    dataIndex: 'ts',
    title: intl.get('users.transactionHistory.date'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'coins',
    dataIndex: 'coins',
    title: intl.get('users.transactionHistory.coins'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: intl.get('users.transactionHistory.status'),
    align: 'center',
    render: value => <span>{(value && intl.get(`users.transactionHistory.${value}`)) || '-'}</span>
  }
]
