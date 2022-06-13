import styled from 'styled-components'

export const StyledSortText = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
`

export const SortByWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 30px;
  .ant-select {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
  .ant-select-selection.ant-select-selection--single,
  .ant-select-selection__rendered {
    height: 30px;
  }
  .ant-select-selection-selected-value {
    line-height: 2;
    font-weight: 600;
  }
`
