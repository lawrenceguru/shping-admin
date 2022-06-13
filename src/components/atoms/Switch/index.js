import React from 'react'
import PropTypes from 'prop-types'
import SwitchOption from '../SwitchOption'

const Switch = ({ value, onChange, values = ['active', 'inactive'] }) => {
  return (
    <SwitchOption
      checked={value === values[0]}
      onChange={checked => {
        if (checked) {
          onChange(values[0])
        } else {
          onChange(values[1])
        }
      }}
    />
  )
}
Switch.propTypes = {
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  values: PropTypes.arrayOf(PropTypes.any)
}
Switch.defaultProps = {
  onChange: undefined,
  value: 'inactive',
  values: []
}
export default Switch
