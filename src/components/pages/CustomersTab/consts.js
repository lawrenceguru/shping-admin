import React from 'react'
import intl from 'react-intl-universal'
import IconButton from '../../molecules/IconButton'
// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'id',
    title: 'Id',
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
  },
  {
    key: 'trial_period',
    title: 'Trial period',
    dataIndex: 'trial_period',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'paid_until',
    title: 'Paid until',
    dataIndex: 'paid_until',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'plan',
    title: 'Plan',
    dataIndex: 'plan',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'rewards_fee',
    title: 'Rewards fee',
    dataIndex: 'rewards_fee',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'payment_issue',
    title: 'Payment issue',
    dataIndex: 'payment_issue',
    align: 'center',
    render: value => (value ? <IconButton type='Warning' styleParam={{ color: '#ef3d46' }} /> : <span>-</span>)
  }
]

export const filterOptions = [
  {
    title: 'ID',
    dataIndex: 'id',
    rowKey: 'id',
    fieldId: 'id',
    columnName: 'ID'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    rowKey: 'name',
    fieldId: 'name',
    columnName: 'Name'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    rowKey: 'name',
    fieldId: 'name',
    columnName: 'Name'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    rowKey: 'name',
    fieldId: 'name',
    columnName: 'Name'
  }
]

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'id',
    columnName: intl.get('customer.filters.id')
  },
  {
    fieldId: 'name',
    columnName: intl.get('customer.filters.name')
  },
  {
    columnName: intl.get('customer.filters.partnerBrand'),
    fieldId: 'partner_brand',
    type: 'checkbox'
  },
  {
    columnName: intl.get('customer.filters.payingCustomer'),
    fieldId: 'paying_customer',
    type: 'checkbox'
  }
]
