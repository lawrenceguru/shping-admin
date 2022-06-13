import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-left: 10px;
  & input {
    width: 100% !important;
  }
`

export const TableWrapper = styled.div`
  margin-top: 30px;
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
