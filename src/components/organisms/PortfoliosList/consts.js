import React from 'react'
// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'budget',
    dataIndex: 'budget',
    title: 'Budget',
    align: 'center',
    render: value => <span>{value ? `$${value}.00` : '-'}</span>
  }
]
