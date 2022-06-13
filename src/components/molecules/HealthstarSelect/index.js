import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const HealthstarSelect = ({ data, field, onChangeCallback, disabled, children }) => {
  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      disabled={disabled}
      optionFilterProp='children'
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      getPopupContainer={trigger => trigger.parentNode}
      value={(data.health_star && data.health_star[field]) || undefined}
      onChange={value => {
        if (value === data.health_star[field]) {
          return
        }
        onChangeCallback(field, value)
      }}
    >
      {children}
    </Select>
  )
}

HealthstarSelect.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  field: PropTypes.string.isRequired,
  onChangeCallback: PropTypes.func,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
}

HealthstarSelect.defaultProps = {
  data: {},
  onChangeCallback: null,
  disabled: false,
  children: null
}

export default HealthstarSelect
