import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    title: intl.get('trackAndTrace.ttOperations.date'),
    dataIndex: 'ts'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.time'),
    dataIndex: 'timestamp_time'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.invoice'),
    dataIndex: 'invoice_number'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.vendorCode'),
    dataIndex: 'item_number'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.carton'),
    dataIndex: 'sscc'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.serialNumber'),
    dataIndex: 'serial_number'
  },
  {
    title: intl.get('trackAndTrace.ttOperations.login'),
    dataIndex: 'user_id'
  }
]
