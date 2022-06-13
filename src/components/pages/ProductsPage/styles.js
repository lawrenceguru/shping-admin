import styled from 'styled-components'
import { Icon } from 'antd'
import React from 'react'

export const StyledIcon = styled(({ isActive, ...rest }) => <Icon {...rest} />)`
  margin: 0 8px;
  font-size: 1.5rem;
  color: ${props => (props.isActive ? '#fd3842' : '#d8d8d8')};
`

export const StyledContainer = styled.div`
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
