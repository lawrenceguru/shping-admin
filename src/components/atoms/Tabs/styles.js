import styled from 'styled-components'
import { Icon } from 'antd'
import React from 'react'

export const TabsHeader = styled.section`
  background-color: #fff;
  margin-top: 96px;
  height: 96px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`

export const TabItem = styled(({ isActive, ...rest }) => <div {...rest} />)`
  span {
    color: #1890ff;
  }
  box-sizing: border-box;
  cursor: pointer;
  align-self: center;
  cursor: pointer;
  align-self: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  border-bottom: ${props => (props.isActive ? '2px solid #1890ff' : 'none')};
  & span {
    align-self: center;
    margin-right: 20px;
  }
`

export const StyledIcon = styled(({ isActive, ...rest }) => <Icon {...rest} />)`
  margin: 0 8px;
  font-size: 1.5rem;
  color: ${props => (props.isActive ? '#fd3842' : '#d8d8d8')};
`
