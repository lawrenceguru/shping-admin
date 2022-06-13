import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const radioOptions = [
  {
    value: 'p',
    label: intl.get('overviewPage.pdf.portrait')
  },
  {
    value: 'l',
    label: intl.get('overviewPage.pdf.landscape')
  }
]
