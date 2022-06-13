// eslint-disable-next-line import/prefer-default-export
export const defaultValues = {
  mainInfo: {
    barcodeNumber: {
      id: '',
      flag: '0',
      comPrefix: '',
      prodCode: '',
      checkDigit: '',
      enteredCheckDigit: ''
    },
    isOneTextInput: false,
    name: '',
    brand: ''
  },
  tradeItem: {
    gpc_segment: '',
    gpc_family: '',
    gpc_class: '',
    gpc_brick: '',
    gpc_brick_attributes: [{ key: undefined, value: undefined }],
    gpc_brick_attributes_server: {}
  },
  sources: [{ conditions: {} }],
  activeSource: 0,
  modalWidget: { name: null, title: null },
  date: null,
  hour: null,
  minute: null,
  median: []
}
