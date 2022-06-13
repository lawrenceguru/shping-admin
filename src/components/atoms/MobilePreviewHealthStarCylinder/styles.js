import styled from 'styled-components'

export const HealthStarCylinderWrapper = styled.div`
  .oval {
    width: 32px;
    height: 13px;
    background: #ffffff;
    border-radius: 50%;
    position: relative;
    z-index: 10;
    font-size: 8px;
    color: #000000;
  }
`

export const Cylinder = styled.div`
  position: absolute;
  overflow: hidden;
  margin: 0 auto;
  top: 3px;
  left: ${props => `${props.leftMargin}px` || '84px'};
  width: 34px;
  height: 45px;
  border-radius: 50px/25px;
  background-color: #fff;
  border: 1px solid black;

  & > .small,
  & > .small:before,
  & > .small:after {
    content: '';
    background-color: black;
    z-index: 5;
    left: 2px;
    top: 3px;
    height: 36px;
    width: 29px;
  }

  &:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 50px/25px;
    background-color: #fff;
    content: '';
  }

  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    border-radius: 50px/25px;
    background-color: #fff;
    content: '';
  }
`

export const HeaderWrapper = styled.div`
  position: relative;
  margin-top: 7px;
  font-size: 7px;
  white-space: nowrap;
  color: #fff;
  z-index: 20;
`
