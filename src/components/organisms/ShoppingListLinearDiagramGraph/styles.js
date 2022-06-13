import styled from 'styled-components'
import React from 'react'
import { Tooltip } from 'react-jsx-highcharts'

export const OverviewEngagementBlock = styled.div`
  position: relative;
  background-color: #fff;
  flex-basis: calc(100% - 25px);
  font-family: Roboto;
  & text {
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #b3b3b3 !important;
    fill: #b3b3b3 !important;
  }
  & .highcharts-container {
    cursor: default;
  }
`

export const TitleChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
  color: black;
  font-size: 1rem;
  & text {
    color: #ffffff;
  }
`

export const LegendTooltip = styled(({ isVisible, ...rest }) => <div {...rest} />)`
  ${({ isVisible }) => (isVisible ? 'display: flex' : 'display: none')}
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  flex-direction: column;
  background-color: #ffffff;
  width: 200px;
  height: 200px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 15px;
  $ > span {
    font-size: 13px;
    font-weight: bold;
    color: #b3b3b3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-variant: t;
  }
`

export const TooltipHeader = styled.h2`
  font-size: 1rem;
  font-weight: 900;
`

export const StyledTooltip = styled(Tooltip)`
  & .highcharts-tooltip text {
    color: '#ffffff';
    fill: white;
  }
`
