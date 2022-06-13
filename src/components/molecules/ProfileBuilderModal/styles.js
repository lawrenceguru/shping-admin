import styled from 'styled-components'
import { Form } from 'antd'

export const StyledForm = styled(Form)`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  min-height: 282px;
  & .ant-form-item-label > label {
    color: rgb(178, 179, 178);
  }
  & .ant-select {
    height: 40px;
    & > div {
      height: 100%;
    }
    & .ant-select-selection-selected-value {
      line-height: 39px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
    }
  }
`

export const ButtonsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 35px;
  & button:nth-child(2).ant-btn {
    height: 34px;
    width: 130px;
    margin-left: 20px;
    border-color: rgba(239, 61, 70, 0.8784313725490196);
    background-color: rgba(239, 61, 70, 0.8784313725490196);
    color: #fff;
    &:hover,
    &:focus {
      background-color: rgb(239, 61, 70);
      border-color: rgb(239, 61, 70);
    }
  }
  & button:first-child {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 34px;
    width: 100px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
`

export const Replacer = styled.div`
  height: 94px;
`
