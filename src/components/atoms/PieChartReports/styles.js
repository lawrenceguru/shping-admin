import styled from 'styled-components'

export const StyledChart = styled.div`
  height: 100%;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
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

export const WrapperNoDataPlaceholder = styled.div`
  & > div {
    min-height: 300px;
    background-color: #ffffffff;
  }
`
