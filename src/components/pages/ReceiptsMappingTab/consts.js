import intl from 'react-intl-universal'

export const columns = [
  {
    title: intl.get('receiptsMapping.action'),
    key: 'action'
  },
  {
    title: intl.get('receiptsMapping.name'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: intl.get('receiptsMapping.gtin'),
    dataIndex: 'pending_gtin',
    key: 'pending_gtin'
  },
  {
    title: intl.get('receiptsMapping.status'),
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: intl.get('receiptsMapping.ts'),
    dataIndex: 'ts',
    key: 'ts'
  }
]

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'name',
    placeholder: intl.get('receiptsMapping.namePlaceHolder')
  },
  {
    fieldId: 'status',
    type: 'select',
    placeholder: intl.get('receiptsMapping.status')
  },
  {
    fieldId: 'stores',
    type: 'select',
    mode: 'multiple',
    placeholder: intl.get('receiptsMapping.storePlaceHolder')
  },
  {
    fieldId: 'receipt_ts',
    type: 'rangePicker',
    placeholder: intl.get('receiptsMapping.fromPlaceHolder')
  }
]

export const defaultInitialStateFilters = {
  name: {
    value: '',
    option: true
  },
  stores: {
    value: [],
    option: true
  }
}
