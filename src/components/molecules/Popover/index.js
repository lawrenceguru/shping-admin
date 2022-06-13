import React from 'react'
import styled from 'styled-components'
import { Popover } from 'antd'
import PropTypes from 'prop-types'

export const StyledPopover = styled.span`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
`

const SharedPopover = ({ popText, children }) => {
  return (
    <Popover content={<StyledPopover>{popText}</StyledPopover>} getPopupContainer={trigger => trigger.parentNode}>
      {children}
    </Popover>
  )
}

SharedPopover.propTypes = {
  popText: PropTypes.string
}

SharedPopover.defaultProps = {
  popText: null
}

export default SharedPopover
