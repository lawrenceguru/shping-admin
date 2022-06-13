import React from 'react'
import { name } from '../../../utils/consts'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: name,
    dataIndex: ['country_info', name],
    title: 'Name',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
