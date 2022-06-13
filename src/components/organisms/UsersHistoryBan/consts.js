import React from 'react'
import intl from 'react-intl-universal'
import { formatDate } from '../../../utils/helpers/date'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'from',
    dataIndex: 'from',
    title: intl.get('users.banHistory.from'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'to',
    dataIndex: 'to',
    title: intl.get('users.banHistory.to'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'reason',
    dataIndex: 'reason',
    title: intl.get('users.banHistory.reason'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'rule_id',
    dataIndex: 'rule_id',
    title: intl.get('users.banHistory.ruleId'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
