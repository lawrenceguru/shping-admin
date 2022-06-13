import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 50px;
  & .ant-spin {
    max-height: initial !important;
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
  & .ant-btn-primary:focus {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & .clear-all {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 42px;
    width: 90px;
    margin-left: 20px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
  & .clear-all.disable {
    background-color: #f2f2f2;
  }
  .ant-table-row {
    cursor: pointer;
  }
  & .ant-upload-list-picture {
    margin-top: -23px;
  }
  & form.filter {
    flex: 0 0 200px;
    & .ant-form-item {
      margin-bottom: 0;
    }
  }
`

export const SwitchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > div {
    margin-top: 0;
  }
`

export const ButtonWrapper = styled.div`
  font-family: 'Roboto';
  & > div {
    padding-left: 0;
    padding-top: 10px;
  }
`
export const DeleteIcon = styled.span`
  float: left;
`
export const Actions = styled.div`
  display: flex;
  & div {
    text-align: center;
    width: 100%;
  }
`
export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
  margin-bottom: 0;
  padding-bottom: 20px;
`
