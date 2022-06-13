import styled from 'styled-components'

export const StyledChart = styled.div`
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  .with-legend .highcharts-container .highcharts-root {
    height: 291px !important;
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
  font-weight: bold;
  color: #000000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 1rem;
  & text {
    color: #ffffff;
  }
`
export const StyledLegend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15%;
`

export const Circle = styled.svg`
  width: 30px;
  height: 25px;
  margin-right: 15px;
`

export const Legends = styled.div`
  width: 100%;
`

export const Legend = styled.div`
  margin: 0 30px;
  align-self: center;
  text-align: center;
  color: #808080;
  fill: #808080;
  font-family: Roboto;
  font-size: 12px;
  line-height: 0px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  line-height: 20px;
  text-align: initial;
  & > span {
    max-width: 110px;
  }
`
