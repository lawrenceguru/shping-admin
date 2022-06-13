import styled from 'styled-components'
import React from 'react'
import { Icon, List } from 'antd'

export const Wrapper = styled.div`
  flex-basis: 14%;
  flex-shrink: 0;
  margin-top: 96px;
  min-width: 255px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`

export const ListItem = styled(({ isActive, ...props }) => <List.Item {...props} />)`
  ${({ isActive }) =>
      isActive &&
      `
// background-color: #e2f8ff;
span {
  color: rgb(24, 144, 255) !important;
}
// border-right: 4px solid #008aff;
`}
    :hover {
    background-color: #f4f4f4;
  }
  span {
    color: #999999;
  }
  padding: 16px 16px 16px 24px !important;
`

export const ListItem2nd = styled(({ isActive, ...props }) => <List.Item {...props} />)`
  span {
    color: #999999;
  }
  padding: 4px 16px 4px 8px !important;
  ${({ isActive }) =>
    isActive &&
    `
span {
  color: rgb(24, 144, 255) !important;
}
`}
`

export const ListItem3rd = styled(({ isActive, ...props }) => <List.Item {...props} />)`
  ${({ isActive }) =>
      isActive &&
      `
background-color: #e2f8ff;
span {
  color: rgb(24, 144, 255) !important;
}
border-right: 4px solid #008aff;
`}
    :hover {
    background-color: #f4f4f4;
  }
  span {
    color: #999999;
  }
  padding: 16px 16px 16px 8px !important;
`

export const StyledIcon = styled(Icon)`
  margin-left: 8px;
  font-size: 1.5rem;
  color: #d8d8d8;
`
