import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
