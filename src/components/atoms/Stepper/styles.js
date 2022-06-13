import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(151, 151, 151, 0.3);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  .activeIcon {
    background: #ff4d4f;
    & > div {
      & > svg {
        color: #fff !important;
      }
    }
  }
  .prevActiveIcon {
    // background: #ffbfc2;
    & > div {
      & > svg {
        color: #1890ff !important;
      }
    }
  }
  .activeLabel {
    color: #ff4d4f;
  }
  .prevActiveLabel {
    color: #ff4d4f;
  }
  .activeTriangle {
    &:after {
      border-left: 19px solid #ff4d4f;
    }
  }
  .prevActiveTriangle {
    &:after {
      border-left: 19px solid #ffbfc2;
    }
  }
`

export const StepsWrapper = styled.div`
  flex: 1 0 auto;
  position: relative;
`

export const IconTriangle = styled.span`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 19px 0 19px 19px;
  border-color: transparent transparent transparent #d3d3d3;
  border-left: 19px solid #565656;
  position: absolute;
  top: 0;
  right: -19px;
  z-index: 1;

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 19px solid transparent;
    border-bottom: 19px solid transparent;
    position: absolute;
    top: -19px;
    right: 0;
    border-left: 19px solid #f4f4f4;
    z-index: 1;
  }
`

export const IconWrapper = styled.div`
  height: 38px;
  font-size: 20px;
  padding: 5px;
  position: relative;
  background: #f4f4f4;
  cursor: pointer;
`

export const LabelWrapper = styled.div`
  padding: 12px 5px;
  border-bottom: 1px solid #d3d3d3;
  border-top: 1px solid #d3d3d3;
  color: #999999;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`
