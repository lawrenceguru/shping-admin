import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

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
    color: #fd3842;
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
  border-bottom: ${props => (props.isActive ? '2px solid #fd3842' : 'none')};
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

export const AnalyticInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  position: relative;
  background-color: #f4f4f4;
  max-height: calc(100% - 96px - 96px);
  height: 100%;
`

export const StyledContainer = styled.div`
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`
