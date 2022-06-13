import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    background-color: rgb(239, 61, 70);
    border-color: rgb(239, 61, 70);
  }
`

const CustomButton = ({
  width,
  height,
  color,
  borderColor,
  backgroundColor,
  marginBottom,
  handleClick,
  text,
  disabled,
  children,
  marginTop,
  position,
  bottom,
  right,
  fontSize,
  className
}) => {
  return (
    <StButton
      disabled={disabled}
      onClick={handleClick}
      className={className}
      style={{
        width,
        height,
        color,
        borderColor,
        backgroundColor,
        marginBottom,
        marginTop,
        position,
        bottom,
        right,
        fontSize
      }}
    >
      {children}
      {text}
    </StButton>
  )
}

CustomButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  marginBottom: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.node,
  marginTop: PropTypes.string,
  position: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  fontSize: PropTypes.string,
  className: PropTypes.string
}

CustomButton.defaultProps = {
  width: '100',
  height: '100',
  color: 'white',
  borderColor: '#ef3d46',
  backgroundColor: '#ef3d46',
  marginBottom: '0',
  marginTop: '0',
  text: null,
  bottom: null,
  right: null,
  position: null,
  fontSize: '14px',
  handleClick: () => {},
  disabled: false,
  children: null,
  className: null
}

export default CustomButton
