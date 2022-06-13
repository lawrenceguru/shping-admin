import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

const GtinSelect = ({
  value,
  disabled,
  onChange,
  getProductCompleteLike,
  completeList,
  completeListIsLoading,
  allowClear,
  placeholder,
  size,
  mode
}) => {
  return (
    <Select
      allowClear={allowClear}
      showSearch
      mode={mode}
      size={size}
      value={value}
      style={{ width: '100%' }}
      disabled={disabled}
      loading={completeListIsLoading}
      onChange={onChange}
      onSearch={searchString => getProductCompleteLike(searchString)}
      placeholder={placeholder}
      getPopupContainer={trigger => trigger.parentNode}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {completeList &&
        completeList.length !== 0 &&
        completeList.map(gtin => (
          <Option key={gtin.value} value={gtin.value}>
            {gtin.label}
          </Option>
        ))}
    </Select>
  )
}

GtinSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  getProductCompleteLike: PropTypes.func.isRequired,
  completeList: PropTypes.arrayOf(PropTypes.object),
  completeListIsLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  mode: PropTypes.string
}

GtinSelect.defaultProps = {
  value: null,
  completeList: null,
  completeListIsLoading: false,
  disabled: false,
  allowClear: false,
  mode: 'multiple',
  placeholder: null,
  size: 'large'
}

export default GtinSelect
