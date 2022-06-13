import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import JsBarcode from 'jsbarcode'
import { BarcodeWrapper, SvgWrapper } from './styles'
import { getValidBarcodeValue, barcodeFormat } from '../../../utils/barcodeValidate'

const Barcode = ({ value }) => {
  const ref = useRef(null)
  const barcodeValue = value && value

  const valid = () => {
    return barcodeValue.search(/^([0-9]{2})+$/) !== -1
  }

  useEffect(() => {
    if (ref.current && barcodeValue) {
      const barcode = getValidBarcodeValue(barcodeValue)
      JsBarcode('#ean', barcode, {
        format: barcodeFormat(barcodeValue),
        width: barcodeFormat(barcodeValue) === 'EAN8' ? 3.8 : 2.4,
        background: '#f4f4f4',
        valid
      })
    }
  }, [ref, barcodeValue])

  return (
    <BarcodeWrapper>
      <SvgWrapper>
        <svg ref={ref} id='ean' />
      </SvgWrapper>
    </BarcodeWrapper>
  )
}

Barcode.propTypes = {
  value: PropTypes.string
}

Barcode.defaultProps = {
  value: undefined
}

export default Barcode
