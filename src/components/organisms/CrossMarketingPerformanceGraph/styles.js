import styled from 'styled-components'
import { HighchartsChart } from 'react-jsx-highcharts'

export const StyledChart = styled(HighchartsChart)`
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  background-color: #fff;
  & g > text > tspan {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
    color: #808080;
    fill: #808080;
  }
  & text > tspan {
    color: #000000;
    fill: #000000;
    font-weight: bold;
    font-size: 1rem;
  }
  & .highcharts-axis-labels {
    font-family: Roboto;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
  }
`

export const BrandsChartWrapper = styled.div`
  flex-basis: calc(50% - 30px);
  border-radius: 6px 6px 6px 6px;
  @media (max-width: 1440px) {
    flex-basis: calc(100% - 30px);
  }
`
