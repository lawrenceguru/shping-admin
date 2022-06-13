import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'
import Typography from '../Typography'

import Wrapper from './styles'

const InputPassword = ({ input: { onChange, value }, label, placeholder, iconRight, visibilityToggle }) => {
  const handleChange = e => {
    onChange(e)
  }

  return (
    <Wrapper>
      <Typography.Text strong>{label}</Typography.Text>
      <AntInput.Password
        onChange={handleChange}
        placeholder={placeholder}
        suffix={iconRight}
        visibilityToggle={visibilityToggle}
        {...{ value }}
      />
    </Wrapper>
  )
}

InputPassword.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  iconRight: PropTypes.node,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  visibilityToggle: PropTypes.bool
}

InputPassword.defaultProps = {
  label: '',
  iconRight: null,
  visibilityToggle: true
}

export default InputPassword
