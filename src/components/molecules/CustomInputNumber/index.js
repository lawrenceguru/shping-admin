import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const CustomInputNumber = ({ isSelectsDisable, value, onChange, style, length, placeholder, step }) => {
  if (step) {
    return (
      <Input
        size='large'
        disabled={isSelectsDisable}
        type='number'
        value={value}
        style={style}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        onKeyPress={e => {
          if ((length && e.target.value.length >= length) || e.key === '-' || e.key === '+') {
            e.stopPropagation()
            e.preventDefault()
          }
        }}
      />
    )
  }
  return (
    <Input
      size='large'
      disabled={isSelectsDisable}
      type='number'
      value={value}
      style={style}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={e => {
        if ((length && e.target.value.length >= length) || e.key === '-' || e.key === '+') {
          e.stopPropagation()
          e.preventDefault()
        }
      }}
    />
  )
}

CustomInputNumber.propTypes = {
  isSelectsDisable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  length: PropTypes.number,
  step: PropTypes.number,
  placeholder: PropTypes.string
}

CustomInputNumber.defaultProps = {
  isSelectsDisable: false,
  value: null,
  onChange: null,
  style: null,
  length: null,
  step: null,
  placeholder: null
}

export default CustomInputNumber
