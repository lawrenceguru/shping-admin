import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import Popover from '../Popover'

const CustomSwitch = ({ popText, handleChange, checked, disabled, defaultChecked }) => {
  return popText ? (
    <Popover popText={popText}>
      <Switch onChange={handleChange} checked={checked} defaultChecked={defaultChecked} disabled={disabled} />
    </Popover>
  ) : (
    <Switch onChange={handleChange} checked={checked} defaultChecked={defaultChecked} disabled={disabled} />
  )
}

CustomSwitch.propTypes = {
  popText: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  defaultChecked: PropTypes.bool
}

CustomSwitch.defaultProps = {
  popText: null,
  checked: false,
  handleChange: null,
  disabled: false,
  defaultChecked: false
}

export default CustomSwitch
