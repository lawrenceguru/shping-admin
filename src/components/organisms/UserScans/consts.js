import React from 'react'
import intl from 'react-intl-universal'
import { formatDate } from '../../../utils/helpers/date'

export const columns = [
  {
    key: 'product_id',
    dataIndex: 'product_id',
    title: intl.get('users.scans.productId'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'product_name',
    dataIndex: 'product_name',
    title: intl.get('users.scans.productName'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'event_ts',
    dataIndex: 'event_ts',
    title: intl.get('users.rewards.ts'),
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'code',
    dataIndex: 'code',
    title: intl.get('users.scans.code'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'accuracy',
    dataIndex: 'accuracy',
    title: intl.get('users.scans.accuracy'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'country',
    dataIndex: 'country',
    title: intl.get('users.scans.country'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'language',
    dataIndex: 'language',
    title: intl.get('users.scans.language'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'longitude',
    dataIndex: 'longitude',
    title: intl.get('users.scans.longitude'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'latitude',
    dataIndex: 'latitude',
    title: intl.get('users.scans.latitude'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]

export const mapStyles = {
  position: 'relative',
  width: 'calc(100% - 40px)',
  height: 'calc(100% - 40px)',
  margin: 20,
  cursor: 'default',
  zIndex: 100
}
