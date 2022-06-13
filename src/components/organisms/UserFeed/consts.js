import React from 'react'
import intl from 'react-intl-universal'
import { formatDateTime } from '../../../utils/helpers/date'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'

const parseDate = date => {
  let result = '-'

  if (date) {
    const modifiedDate = date.indexOf('.') >= 0 ? `${date.substr(0, 19)}Z` : date
    result = formatDateTime(modifiedDate)
  }

  return result
}

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'ts',
    dataIndex: 'ts',
    title: intl.get('users.buddies.ts'),
    align: 'center',
    render: value => <span>{(value && parseDate(value)) || '-'}</span>
  },
  {
    key: 'coins',
    dataIndex: 'coins',
    title: intl.get('users.buddies.coins'),
    align: 'center',
    render: value => <span>{(value && convertFromUint256(value)) || '-'}</span>
  },
  {
    key: 'text',
    dataIndex: 'text',
    title: intl.get('users.timeline.text'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
