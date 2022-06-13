import styled from 'styled-components'

export const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  & .ant-table-pagination.ant-pagination {
    margin: 16px -15px;
  }
  & .ant-table-thead > tr > th .ant-table-header-column {
    min-width: 35px;
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
`

export const StyledText = styled.span`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
`
