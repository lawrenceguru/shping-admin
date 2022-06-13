import styled from 'styled-components'
import { HighchartsChart } from 'react-jsx-highcharts'

export const StyledChart = styled(HighchartsChart)`
  border-radius: 0 0 6px 6px;
  height: 290px;
  background-color: #fff;
  @media (max-width: 1150px) {
    height: 260px;
  }
`

export const CampaignsChartWrapper = styled.div`
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  & .label {
    z-index: 1 !important;
  }

  & .highcharts-tooltip span {
    background-color: white;
    min-width: 100px;
    opacity: 1;
    z-index: 9999 !important;
  }
`
