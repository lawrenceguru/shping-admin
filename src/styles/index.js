import styled, { css } from 'styled-components'
import React from 'react'

export const DefaultText = styled.span`
  font-size: 15px;
  color: #b3b3b3;
  font-family: Roboto;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.07;
  letter-spacing: normal;
`

export const BlockText = styled.span`
  color: #0e0cec;
  font-size: 40px;
  width: 88px;
  height: 30px;
  font-family: Roboto;
  font-size: 28px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.07;
  letter-spacing: normal;
`

export const WidgetTemplate = styled(({ isHaveNotData, ...props }) => <div {...props} />)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-radius: 0px 0px 6px 6px;
  ${({ isHaveNotData }) => isHaveNotData && 'height: 100%; background-color: #fff;'}
`

export const SiglePageWrapperStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 98px;
  font-family: Roboto;
  padding: 30px;
  font-family: 'Roboto';
  .ant-spin {
    max-height: 100% !important;
  }
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div,
  & .ant-input,
  & .ant-input:focus {
    border: none;
    box-shadow: none;
  }
  & .ant-select-open {
    color: rgba(0, 0, 0, 0.65);
  }
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`

export const HeaderStyle = css`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const StyledForm = styled.form`
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  & .ant-form-item {
    margin-bottom: 10px;
  }
  & .ant-checkbox-wrapper {
    margin: 10px 0;
  }
  & label {
    font-size: 15px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65) !important;
  }
  & div > span > span {
    margin: 0;
    height: 40px;
  }
  & div > div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
  & .ant-calendar-picker {
    margin-top: 5px;
  }
`

export const SubHeader = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div:last-child {
    display: flex;
  }
  & > div {
    & > div {
      & > button {
        width: 140px;
      }
    }
  }
`
