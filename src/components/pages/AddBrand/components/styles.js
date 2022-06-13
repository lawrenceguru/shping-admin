import styled from 'styled-components'
// import intl from 'react-intl-universal'
import React from 'react'

const getWidth = iso => {
  switch (iso) {
    case '702':
      return 150
    default:
      return 100
  }
}

export const Wrapper = styled.div``

export const getCompanyPrefixLimit = iso => {
  switch (iso) {
    case '702':
      return 9
    default:
      return 7
  }
}

export const BarcodeWrapper = styled.div`
  position: relative;
  margin-bottom: 13px;
  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    min-width: ${({ country }) => getWidth(country)}px;
    height: 10px;
    border: 1px solid red;
    left: 11px;
    border-top: 0;
  }
`

export const Label = styled.div`
  position: absolute;
  bottom: -6px;
  font-size: 1rem;
  z-index: 9;
  width: ${({ country }) => getWidth(country)}px;
  margin: 0 auto;
  text-align: center;
  left: 11px;
  display: flex;
  justify-content: center;
  min-height: auto;

  > span {
    background: #f4f4f4;
    position: absolute;
    top: -14px;
    padding: 0 5px;
    font-size: 10px;
  }
`

export const Note = styled(({ className, country }) => (
  <div className={className}>
    <span style={{ fontSize: '14px' }}>
      <span>Note:</span>The Company Prefix is the first {getCompanyPrefixLimit(country)} digits of your barcode number
    </span>
  </div>
))`
  font-size: 1.12rem;
  display: inline-block;
  > span > span {
    margin-right: 3px;
    display: inline-block;
    font-weight: bold;
    font-style: italic;
  }
`
