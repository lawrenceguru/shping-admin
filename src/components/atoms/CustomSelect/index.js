import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const CustomSelect = ({ value, disabled, loading, handleValueChange, children, placeholder, size, mode, register }) => {
  return (
    <Select
      showSearch
      mode={mode}
      style={{ width: '100%' }}
      optionFilterProp='children'
      disabled={disabled}
      loading={loading}
      size={size}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      getPopupContainer={trigger => trigger.parentNode}
      value={value || undefined}
      onChange={handleValueChange}
      placeholder={placeholder}
      register={register}
    >
      {children}
    </Select>
  )
}

CustomSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  handleValueChange: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  mode: PropTypes.string,
  register: PropTypes.func
}

CustomSelect.defaultProps = {
  value: undefined,
  handleValueChange: null,
  children: null,
  disabled: false,
  loading: false,
  placeholder: null,
  size: null,
  mode: null,
  register: null
}

export default CustomSelect
