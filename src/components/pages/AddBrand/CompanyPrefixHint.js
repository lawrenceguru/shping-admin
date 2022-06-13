import React from 'react'
import { connect } from 'react-redux'
// import intl from 'react-intl-universal'

import Barcode from '../../atoms/Barcode'
import { BarcodeWrapper, Label, Note, Wrapper } from './components/styles'

const getSampleBarcode = iso => {
  switch (iso) {
    case '702':
      return '08881234567895'
    default:
      return '09312345678907'
  }
}

const CompanyPrefixHint = ({ className, country, locale }) => {
  const language = localStorage.getItem('localLocale')
  const style = (language === 'ru' && { width: 161, left: 7, top: -11 }) || {}
  console.log('contry =>', country)
  return (
    <Wrapper className={className}>
      <BarcodeWrapper country={country}>
        <Barcode key='products.mobileBarcode' value={getSampleBarcode(country)} />
        <Label country={country}>
          <span style={style}>Company Prefix</span>
        </Label>
      </BarcodeWrapper>
      <Note country={country} locale={locale} />
    </Wrapper>
  )
}

const mapStateToProps = ({ settings: { userCountry, locale } }) => ({
  country: userCountry,
  locale
})

export default connect(mapStateToProps)(CompanyPrefixHint)
