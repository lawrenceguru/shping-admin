import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 12px;
  padding: 5px;
  margin: 5px 20px;
  border: 2px solid #f9f9f9;
`

const MobilePreviewBorderContainer = ({ children }) => {
  return <WidgetWrapper>{children}</WidgetWrapper>
}

MobilePreviewBorderContainer.propTypes = {
  children: PropTypes.node
}

MobilePreviewBorderContainer.defaultProps = {
  children: null
}

export default MobilePreviewBorderContainer
