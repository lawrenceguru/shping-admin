import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
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
  & .ant-btn-primary:focus {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  & .spinner {
    top: 150px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    margin: 0 8px;
  }
`
