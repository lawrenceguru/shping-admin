import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'

import Typography from '../Typography'

import Wrapper from './styles'

const Input = ({ input: { onChange, value }, label, placeholder, iconRight, style, size, type }) => {
  const handleChange = e => {
    onChange(e)
  }

  return (
    <Wrapper style={style}>
      <Typography.Text strong>{label}</Typography.Text>
      <AntInput
        onChange={handleChange}
        placeholder={placeholder}
        suffix={iconRight}
        size={size}
        {...{ value }}
        type={type}
      />
    </Wrapper>
  )
}

Input.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  iconRight: PropTypes.node,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  size: PropTypes.string
}

Input.defaultProps = {
  label: '',
  iconRight: null,
  style: {},
  size: 'default'
}

export default Input
