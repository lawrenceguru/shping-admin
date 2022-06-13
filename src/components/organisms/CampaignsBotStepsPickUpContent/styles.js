import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 15px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  & .ant-input: focus,
    & .ant-input: hover,
    & .ant-select-selection__rendered: focus,
    & .ant-select-selection__rendered: hover {
    border-color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 63%;
    left: 2%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & > div:last-child {
    padding-right: 45px !important;
  }
  & .ant-popover-inner-content {
    padding-right: 16px !important;
  }
`

export const BlockHeader = styled.h2`
  font-family: Roboto;
  font-weight: 900;
  font-size: 25px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.65);
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  & span {
    font-weight: 900;
    margin-left: 10px;
  }
`
