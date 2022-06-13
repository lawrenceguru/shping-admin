import styled from 'styled-components'
import { Tooltip } from 'react-jsx-highcharts'

export const SpendChartBlock = styled.div`
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

export const StyledTooltip = styled(Tooltip)`
  & .highcharts-tooltip text {
    color: '#ffffff';
    fill: white;
  }
`
