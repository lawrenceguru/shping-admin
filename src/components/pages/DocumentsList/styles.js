import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 30px;
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

export const StyledTableContainer = styled.div`
  margin-top: 20px;
  min-width: 600px;
`

export const StyledPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledSelectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div,
  & .ant-input,
  & .ant-input:focus {
    border: none;
    box-shadow: none;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const ExportButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  & > div {
    padding: 0;
  }
`
