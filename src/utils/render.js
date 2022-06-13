import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const renderStringFromArray = (array, intlPath) => {
  let result = ''

  if (array && array.length) {
    array.forEach((item, index) => {
      if (index + 1 !== array.length) {
        result += `${intl.get(`${intlPath}.${item}`) || item}, `
      } else {
        result += `${intl.get(`${intlPath}.${item}` || item)}`
      }
    })
  }
  return result || '-'
}
