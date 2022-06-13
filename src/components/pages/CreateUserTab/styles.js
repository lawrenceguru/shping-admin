import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  & input {
    width: 100% !important;
  }
`

export const TableWrapper = styled.div`
  margin-top: 30px;
  margin-left: 10px;
  & .ant-radio-checked .ant-radio-inner {
    border-color: #ef3d46 !important;
  }
  & .ant-radio-inner::after {
    background-color: #ef3d46 !important;
  }
  & .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: #ef3d46 !important;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  & button {
    width: 200px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  & .ant-btn:not([disabled]):hover {
    background-color: #fff;
    text-decoration: none;
    color: rgb(178, 179, 178);
    border: 1px solid #b3b3b333;
  }
  & button {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 44px;
    margin-left: 10px;
    margin-bottom: 20px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
`

export const StyledDiv = styled.div`
  margin: 0 10px;
  width: 100%;
`

export const SelectContextWrapper = styled.div`
  margin-top: 20px;
  p {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }
  .ant-select-selection__rendered {
    line-height: 32px !important;
    font-size: 16px;
  }
  .ant-select-selection {
    border: 1px solid #d9d9d9;
    border-top-width: 1.02px;
    border-radius: 4px;
  }
`
