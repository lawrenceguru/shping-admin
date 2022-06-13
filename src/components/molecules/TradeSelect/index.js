import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

const TradeSelect = ({ isLoading, value, onChangeFunc, placeholder, disabled, children, label }) => {
  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      loading={isLoading}
      optionFilterProp='children'
      disabled={disabled}
      value={value}
      getPopupContainer={trigger => trigger.parentNode}
      placeholder={placeholder}
      optionLabelProp={label}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={onChangeFunc}
    >
      {children}
    </Select>
  )
}

TradeSelect.propTypes = {
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool
}

TradeSelect.defaultProps = {
  isLoading: false,
  disabled: false,
  value: undefined
}

export default TradeSelect
