import styled from 'styled-components'

export const TableWrapper = styled.div`
  position: relative;
  height: 300px;
  ${({ loading }) => (loading ? 'opacity: 0.4; pointer-events: none;' : '')}
  transition: opacity 0.3s
  overflow-y: scroll;
  .ant-table-wrapper {
    background-color: #fff;
    border-radius: 10px;
  }
  .ant-table-header-column {
    color: #000000c9;
    font-weight: 700;
  }
  .ant-table-thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .ant-table-tbody {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-weight: 600;
  }
  .ant-table-row {
    ${({ disabled }) => (disabled ? 'opacity: 0.4; pointer-events: none;' : '')}
    cursor: pointer;
  }
  .ant-table-thead label {
    display: none !important;
  }
  &::-webkit-scrollbar {
    background-color: #fff !important;
    width: 16px !important;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff !important;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4 !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #babac0 !important;
    border-radius: 16px !important;
    border: 3px solid #fff !important;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5 !important;
    border: 2px solid #f4f4f4 !important;
  }
  tr[data-row-key='${({ activeRow }) => activeRow}'] {
    background-color: #f0f0f0;
  }
`

export const LoaderWrapper = styled.div`
  position: relative;
`

export const FilterPanelWrapper = styled.div`
  & > div > div > div {
    flex-basis: 100%;
  }
  & > div > div > div > div > div {
    ${({ count }) => (count > 2 ? 'flex-basis: 30%;' : 'flex-basis: 45%;')}
  }
`
