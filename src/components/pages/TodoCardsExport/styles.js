import styled from 'styled-components'

export const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  padding-bottom: 40px;
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
  .ant-table-row svg:hover {
    opacity: 0.5;
  }
  .ant-spin {
    color: rgb(178, 179, 178);
  }
`

export const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & label {
    font-size: 15px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65) !important;
  }

  & div > span > span {
    margin: 0;
    height: 40px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-children > span {
    font-weight: 900;
  }

  .ant-select-selection-selected-value {
    font-weight: 400;
  }
`
export const FieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 80%;
  justify-content: space-between;
  .ant-form-item {
    flex-basis: 45%;
  }
  .ant-select-lg {
    width: 100%;
  }
`

export const ButtonWrapper = styled.div`
  padding: 31px 0;
  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`
export const RefreshPanel = styled.div`
  display: flex;
  justify-content: flex-start;
  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`
