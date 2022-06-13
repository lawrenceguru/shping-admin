import styled from 'styled-components'
import { Button, Modal } from 'antd'

const SettingForm = styled.div`
  & {
    .ant-form-item {
      margin-bottom: 10px !important;
    }
    .ant-picker {
      width: 100%;
    }
    .ant-form-item-control-input-content {
      display: flex;
    }
    .addProduct {
      border-radius: 3px;
      margin: 30px 0;
    }
    .ant-form-item-required::before {
      content: '*' !important;
    }
    .cancelButton {
      color: #5d5fef;
      border: 0;
      border-bottom: 2px solid #f5f2f2;
    }
  }
`
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

const AddProduct = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: start;
  margin-left: 80%;
`
export const Section = styled.div`
  display: block;
  & .switch .ant-form-item-control-input-content > div {
    justify-content: left;
  }
  & .ant-checkbox + span {
    color: rgba(0, 0, 0, 0.85);
  }
  & label[for='setting-form_image'] {
    font-weight: 900;
  }
  & .horizontal {
    flex-direction: row !important;
    & label {
      width: 130px;
      margin-top: 3px !important;
    }
  }
  & .horizontal-products {
    flex-direction: row !important;
    & .ant-form-item-label {
      width: 100px;
    }
    & .ant-form-item-control .ant-form-item-control-input {
      width: 20px;
      margin-top: -4px;
    }
  }
`
export const StepWrapper = styled.div`
  padding: 20px;
  background-color: white;
  & .ant-input {
    border: 1px solid #d9d9d9;
    &:focus {
      border: 1px solid #d9d9d9;
    }
  }
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
export const AddAnswer = styled('div')`
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
export const TransBackground = styled.div`
  color: rgba(0, 0, 0, 0.85);
`
export const Label = styled.div`
  color: rgba(0, 0, 0, 0.85);
`
export const LeftWrapper = styled.div`
  background: white;
  padding: 25px;
`
export const TypeButton = styled(Button)`
  // border-radius: 20px !important;
  // height: 24px !important;
  width: auto !important;
  padding: 10px 15px !important;
  margin-right: 10px;
  &.ant-btn-background-ghost {
    background: transparent !important;
    border-color: #f4f4f4 !important;
    color: rgb(179, 179, 179) !important;
  }
`
export const ModalWrapper = styled(Modal)`
  & .ant-btn {
    height: 40px;
    width: 130px;
  }
  & .ant-btn-primary {
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & .ant-modal-footer {
    text-align: center;
    border: 0;
    padding-bottom: 30px;
    padding-top: 0;
  }
`
export const Banner = styled.div`
  margin-top: -19px;
`

export { SummaryContainer, StickyWrapper, StepContainer, AddProduct, SettingForm }
