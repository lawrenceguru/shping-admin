import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 40px;
  .activeIcon {
    background: #1890ff;
    border: 0;
    & > div {
      & > svg {
        color: #1890ff !important;
      }
    }
    & > span {
      color: #ffffff;
      font: inherit;
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
    color: rgba(0, 0, 0, 0.85);
  }
  .prevActiveLabel {
    color: rgba(0, 0, 0, 0.85);
  }
    &::after {
    content: '';
    position: absolute;
    display: flex;
    left: 0;
    top: calc(50% - 2px);
    height: 2px;
    width: 100%;
    background: #9b9b9b;
  }
  }
`

export const StepsWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  & .prevActiveIcon {
    border: 1px solid #1890ff !important;
  }
`

export const IconWrapper = styled.div`
  display: inline-block;
  height: 38px;
  width: 38px;
  text-align: center;
  font-size: 20px;
  margin: 0 10px;
  padding: 3px 10px;
  position: relative;
  border-radius: 50%;
  // background: #ffffff;
  border: 1px solid #999999;
  cursor: pointer;
  & > span {
    font: inherit;
    vertical-align: baseline;
    color: #999999;
  }
  & .stepPrevIcon {
    svg {
      color: #1890ff;
    }
  }
  & .prevActiveIcon {
    border: 1px solid #1890ff !important;
  }
`

export const LabelWrapper = styled.div`
  display: inline-block;
  padding: 0 10px 0 0px !important;
  color: #999999;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`
