import React from 'react'
import PropTypes from 'prop-types'
import { Button as AntButton } from 'antd'

import Wrapper from './styles'

const Button = ({ block, children, disabled, htmlType, loading, size, type, className, onClick }) => {
  return (
    <Wrapper>
      <AntButton {...{ block, disabled, loading, htmlType, size, type, className, onClick: onClick || undefined }}>
        {children}
      </AntButton>
    </Wrapper>
  )
}

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  block: false,
  disabled: false,
  htmlType: 'button',
  loading: false,
  size: 'default',
  type: null,
  className: null,
  onClick: null
}

export default Button
