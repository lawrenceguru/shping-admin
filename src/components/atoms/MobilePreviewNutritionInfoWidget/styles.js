import styled from 'styled-components'

export const Percentage = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  > span:last-child {
    margin-left: 5px;
  }
`

export const NutritionDetails = styled.div`
  position: relative;
  &::after {
    content: '';
    height: 100%;
    width: 0;
    position: absolute;
    border-color: #feb5b5;
    border-style: dashed;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 0;
    border-left-width: 1px;
    right: 20%;
    top: 0;
  }
`

export const NutritionInfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  & .rc-slider-rail {
    background-color: #feb5b5;
    height: 18px;
    border-radius: 18px;
  }
  & .rc-slider-handle {
    position: absolute;
    margin-left: -5px;
    margin-top: -6px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #fe494a;
    transition: all 0.3s ease;
  }
  & .rc-slider-step {
    position: absolute;
    width: calc(100% - 20px);
    height: 10px;
    background: transparent;
  }
  & .rc-slider-track {
    display: none;
  }
  & .rc-slider-dot {
    background-color: #fff;
    border: none;
  }
  & .rc-slider-dot-active {
    border-color: #fff;
  }
`

export const NutritionInfoItemsHeadersWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 12px;

  & > span:first-child {
    flex-basis: 70%;
  }

  & > span:last-child {
    flex-basis: 10%;
  }
`

export const NutritionInfoDataWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-flow: column nowrap;
  width: 90%;
  position: relative;
  font-size: 12px;
`

export const DetailWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px 0;
  padding-left: 20px;

  & > span:nth-child(2) {
    margin-left: 10px;
  }
`

export const SliderRangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & .rc-slider {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  & > div:first-child,
  & > div:last-child {
    padding-top: 5px;
  }
`
