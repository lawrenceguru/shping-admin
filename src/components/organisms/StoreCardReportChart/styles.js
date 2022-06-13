import styled from 'styled-components'
import { HighchartsChart, Tooltip } from 'react-jsx-highcharts'

export const StyledChart = styled(HighchartsChart)`
  border-radius: 0px 0px 6px 6px;
  & g > text > tspan {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: normal;
    color: #808080;
    fill: #808080;
  }
  & > text > tspan {
    color: #000000;
    fill: #000000;
    font-weight: bold;
    font-size: 1rem;
  }
`

export const StyledChartBlock = styled.div`
  height: 100%;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
`

export const StyledTooltip = styled(Tooltip)`
  & .highcharts-tooltip text {
    color: '#ffffff';
    fill: white;
  }
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const WrapperNoDataPlaceholder = styled.div`
  & > div {
    min-height: 300px;
    background-color: #ffffffff;
  }
`
