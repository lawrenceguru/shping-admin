import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox as AntCheckbox } from 'antd'

import Wrapper from './styles'

const Checkbox = ({ children, defaultChecked, size, handleChange }) => {
  return (
    <Wrapper>
      <AntCheckbox defaultChecked={defaultChecked} size={size} onChange={handleChange}>
        {children}
      </AntCheckbox>
    </Wrapper>
  )
}

Checkbox.propTypes = {
  children: PropTypes.node,
  defaultChecked: PropTypes.bool,
  size: PropTypes.string,
  handleChange: PropTypes.func
}

Checkbox.defaultProps = {
  children: null,
  defaultChecked: false,
  size: 'large',
  handleChange: null
}

export default Checkbox
