import React from 'react'
import intl from 'react-intl-universal'
import moment from 'moment'
import { getMomentLocale } from '../../../utils/helpers/date'

export const filterData = [
  { label: intl.get('overviewPage.daily'), value: 'days' },
  { label: intl.get('overviewPage.weekly'), value: 'weekly' },
  { label: intl.get('overviewPage.monthly'), value: 'monthly' }
]

export const typeOptions = [
  {
    label: 'New cards',
    value: 'new'
  },
  {
    label: 'Card usage',
    value: 'usage'
  }
]

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'dates',
    type: 'rangePicker',
    columnName: 'Range Picker',
    format: 'YYYY-MM-DD',
    width: '240px'
  },
  {
    columnName: 'Period',
    fieldId: 'period',
    type: 'select',
    options: filterData
  },
  {
    columnName: 'Report Type',
    fieldId: 'reportType',
    type: 'select',
    options: typeOptions
  }
]

export const columns = [
  {
    key: 'date',
    dataIndex: 'ts',
    title: 'Date',
    align: 'center',
    render: value => (
      <span>
        {(value &&
          moment(value)
            .locale(getMomentLocale())
            .format('lll')) ||
          '-'}
      </span>
    )
  },
  {
    key: 'card_name',
    dataIndex: 'card_name',
    title: 'Card',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'user_name',
    dataIndex: 'user_name',
    title: 'User',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  }
]
