import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const TableWrapper = styled.div`
  margin-top: 20px;
  .ant-table-wrapper {
    background-color: #fff;
    border-radius: 10px;
  }
  .ant-table-header-column {
    color: #000000c9;
    font-weight: 700;
  }
  .ant-table-tbody {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-weight: 600;
  }
  & ::-webkit-scrollbar {
    background-color: #fff !important;
    width: 16px !important;
  }
  & ::-webkit-scrollbar-track {
    background-color: #fff !important;
  }
  & ::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4 !important;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: #babac0 !important;
    border-radius: 16px !important;
    border: 3px solid #fff !important;
  }
  & ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5 !important;
    border: 2px solid #f4f4f4 !important;
  }
`
