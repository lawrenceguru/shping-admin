import styled from 'styled-components'
import { Switch, Button } from 'antd'

const SummaryContainer = styled.div`
  padding: 25px;
  flex: 1;
  position: sticky;
  top: 0;
  background: white;
  text-align: center;
`

const StickyWrapper = styled('div')`
  ${({ stickToBottom }) =>
    stickToBottom &&
    `
        position: absolute;
        width: 100%;
        bottom: 30px;
    `};

  ${({ stick }) =>
    stick &&
    `
        position: fixed;
        top: 80px;
        width: 26.1%;
    `};
`

const StepContainer = styled('div')`
  display: flex;
  width: 70%;
  margin: auto;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  ${({ theme, active }) => active && `color: ${theme.palette.secondary}`};
`

const AddAnswer = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: start;

  & > p {
    margin-left: 10px;
    font-weight: bold;
  }
  & > button {
    border-radius: 100px;
    border: 0px none;
    transition: all 0.3s ease 0s;
    float: right;
    box-shadow: rgb(37 37 37) 0px 0px 0px 2px inset, rgb(37 37 37) 0px 0px 0px 0px;
    color: rgb(255, 255, 255);
    background: rgb(37, 37, 37);
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 50px;
    height: 50px;
    &:hover {
      box-shadow: rgb(20 20 20) 0px 0px 0px 2px inset, rgb(20 20 20) 0px 0px 0px 2px;
      background: rgb(20, 20, 20);
    }
    &:focus {
      background: rgb(37, 37, 37);
    }
  }
`
export const StyledSwitch = styled(Switch)`
  margin-top: 8px !important;
`
export const TypeButton = styled(Button)`
  border-radius: 20px !important;
  height: 24px !important;
  width: 125px !important;
  margin-right: 10px;
  &.ant-btn-background-ghost {
    background: transparent !important;
    border-color: #1890ff !important;
  }
`
export const LeftWrapper = styled.div`
  background: white;
  padding: 25px;
`
export const Label = styled.div`
  color: rgba(0, 0, 0, 0.85);
`
export const Formlist = styled.div`
  margin-bottom: 20px;
  & > .ant-form-item > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    & > input {
      display: flex;
      flex: 1 1 0%;
    }
    & > button {
      margin-right: 15px;
      text-decoration: none;
      border-radius: 100px;
      border: 0px none;
      transition: all 0.3s ease 0s;
      box-shadow: rgb(0 0 0 / 8%) 0px 0px 0px 2px inset;
      background: none;
      color: rgb(37, 37, 37);
      float: right;
      line-height: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px;
      width: 50px;
      height: 50px;
      &:focus {
        background: none;
      }
      &:hover {
        box-shadow: transparent 0px 0px 0px 0px inset, transparent 0px 0px 0px 2px;
        background: rgb(244, 244, 244);
      }
    }
  }
`
export { SummaryContainer, StickyWrapper, StepContainer, AddAnswer }
