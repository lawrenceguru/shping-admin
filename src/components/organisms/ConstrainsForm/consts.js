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
    key: 'id',
    dataIndex: 'id',
    title: 'GTIN',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
