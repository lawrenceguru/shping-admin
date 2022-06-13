import React from 'react'
import intl from 'react-intl-universal'
import { formatDate } from '../../../utils/helpers/date'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'campaign_id',
    dataIndex: 'campaign_id',
    title: intl.get('users.rewards.campaignId'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'ts',
    dataIndex: 'ts',
    title: intl.get('users.rewards.ts'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'approved_events',
    dataIndex: 'approved_events',
    title: intl.get('users.rewards.approvedEvents'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'approved_coins',
    dataIndex: 'approved_coins',
    title: intl.get('users.rewards.approvedCoins'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'pending_coins',
    dataIndex: 'pending_coins',
    title: intl.get('users.rewards.pendingCoins'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'closed_coins',
    dataIndex: 'closed_coins',
    title: intl.get('users.rewards.closedCoins'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'user_coin_rate',
    dataIndex: 'user_coin_rate',
    title: intl.get('users.rewards.userCoinRate'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
