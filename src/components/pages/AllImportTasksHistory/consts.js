import React from 'react'
import moment from 'moment'
import { getMomentLocale } from '../../../utils/helpers/date'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'file',
    title: 'File',
    dataIndex: 'file',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'file_size',
    title: 'Size',
    dataIndex: 'file_size',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'uploaded_images',
    title: 'Uploaded Images',
    dataIndex: 'uploaded_images',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'bad_images',
    title: 'Bad Images',
    dataIndex: 'bad_images',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'total_products',
    title: 'Total Products',
    dataIndex: 'total_products',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'missed_products',
    title: 'Missed Products',
    dataIndex: 'missed_products',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'total_objects',
    title: 'Total Objects',
    dataIndex: 'total_objects',
    align: 'center',
    render: value => <span>{value || '0'}</span>
  },
  {
    key: 'start_ts',
    title: 'Start',
    dataIndex: 'start_ts',
    align: 'center',
    render: value => (
      <span>
        {(value &&
          moment
            .utc(value)
            .local()
            .locale(getMomentLocale())
            .format('lll')) ||
          '0'}
      </span>
    )
  },
  {
    key: 'end_ts',
    title: 'End',
    dataIndex: 'end_ts',
    align: 'center',
    render: value => (
      <span>
        {(value &&
          moment
            .utc(value)
            .local()
            .locale(getMomentLocale())
            .format('lll')) ||
          '0'}
      </span>
    )
  }
]
