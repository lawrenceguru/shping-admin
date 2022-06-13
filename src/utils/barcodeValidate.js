import { startsWith } from 'lodash'

export const barcodeFormat = gtin => {
  if (gtin[0] !== '0') {
    return 'CODE128'
  }
  if (gtin[0] === '0' && gtin[1] !== '0') {
    return 'EAN13'
  }
  if (startsWith(gtin, '000000')) {
    return 'EAN8'
  }
  return 'EAN13'
}

export const getValidBarcodeValue = gtinNumber => {
  const type = barcodeFormat(gtinNumber)
  switch (type) {
    case 'EAN13':
      return gtinNumber.substring(1, gtinNumber.length)
    case 'EAN8':
      return gtinNumber.substring(6, gtinNumber.length)
    default:
      return gtinNumber
  }
}
