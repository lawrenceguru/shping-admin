import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const defaultValues = {
  select: {
    gtin: null,
    name: null
  },
  serialization: {
    AdditionalTypes: [{ type: [], content: '' }],
    Assign: '',
    format: [],
    count: '',
    data_type: [],
    length: '',
    sequence: [],
    type: [],
    Update: ''
  },
  isAdvancedMode: false,
  tradeItem: {
    gpc_segment: '',
    gpc_family: '',
    gpc_class: '',
    gpc_brick: '',
    gpc_brick_attributes: [{ key: undefined, value: undefined }],
    gpc_brick_attributes_server: {}
  },
  location: null,
  sources: [{ conditions: {}, data: [] }],
  activeSource: 0,
  modalWidget: { name: null, title: null },
  settings: {
    name: intl.get('no'),
    code: intl.get('yes'),
    owner: intl.get('no'),
    delimiter: '|',
    labels_as_titles: intl.get('no')
  },
  source: { conditions: {}, data: [{ text: { title: undefined, text: undefined } }] }
}

export const valuesForReset = {
  select: {
    gtin: null,
    name: null
  },
  serialization: {
    AdditionalTypes: [{ type: [], content: '' }],
    Assign: '',
    format: [],
    count: '',
    data_type: [],
    length: '',
    sequence: [],
    type: [],
    Update: ''
  },
  isAdvancedMode: false,
  tradeItem: {
    gpc_segment: '',
    gpc_family: '',
    gpc_class: '',
    gpc_brick: '',
    gpc_brick_attributes: [{ key: undefined, value: undefined }],
    gpc_brick_attributes_server: {}
  },
  location: null,
  sources: [{ conditions: {}, data: [] }],
  activeSource: 0,
  modalWidget: { name: null, title: null },
  settings: { name: 'no', code: 'yes', owner: 'no', delimiter: '|', labels_as_titles: 'no' },
  source: { conditions: {}, data: [{ text: { title: undefined, text: undefined } }] }
}
