import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'
import intl from 'react-intl-universal'
import { StyledRadio } from './styles'

const plainOptions = [
  intl.get('serializedProductsPage.all'),
  intl.get('serializedProductsPage.me'),
  intl.get('serializedProductsPage.exceptMe')
]
const defaultChecked = intl.get('serializedProductsPage.all')

const OwnerSelector = ({ handleChange }) => {
  const [checked, setChecked] = useState(defaultChecked)

  const onChangeHandle = value => {
    handleChange(value)
    setChecked(value)
  }

  return (
    <Radio.Group onChange={e => onChangeHandle(e.target.value)} value={checked} style={{ flexBasis: '50%' }}>
      {plainOptions.map(el => (
        <StyledRadio key={el} value={el}>
          {el}
        </StyledRadio>
      ))}
    </Radio.Group>
  )
}

OwnerSelector.propTypes = {
  handleChange: PropTypes.func
}

OwnerSelector.defaultProps = {
  handleChange: null
}

export default OwnerSelector
