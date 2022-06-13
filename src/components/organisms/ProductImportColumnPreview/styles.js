import styled from 'styled-components'

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
  .ant-table-tbody > tr > td {
    border: none;
  }
  .ant-select {
    font-weight: 400;
  }
`

export const Header = styled.h2`
  flex-basis: 100%;
  font-size: 20px;
  font-weight: 900;
  margin: 0.8em 0;
`
export const WrapperOptionContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    flex-basis: 20%;
  }
  & > span {
    flex-basis: 60%;
    font-size: 16px;
  }
`

export const SortableItemWrapper = styled.tr`
  td {
    width: 200px;
  }
  &:first-child {
    width: 110px;
  }

  &:last-child {
    width: 135px;
  }

  .ant-select-lg {
    width: 100%;
    font-weight: 400;
  }

  .ant-checkbox-inner {
    border-color: #f5222d;
  }
`

export const List = styled.div`
  background-color: #ffffff;
  height: max-content;
  ${({ countItems, width }) =>
    countItems ? `height: ${countItems * (width > 1365 ? 72 : 76) + (width > 1610 ? 54 : 75)}px` : ''}
`
export const ListItem = styled.div`
  flex-basis: 20%;
  text-align: center;
  padding: 16px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  font-variant: tabular-nums;
  box-sizing: border-box;
`
export const ListRow = styled.div`
  display: flex;
  align-items: center;
`

export const ListHeaderRow = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
`
export const ListHead = styled.div`
  padding: 16px;
  flex-basis: 20%;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 900;
`

export const ListHeadSelect = styled.div`
  padding: 16px;
  flex-basis: 35%;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 900;
`

export const ListItemSelect = styled.div`
  flex-basis: 35%;
  text-align: center;
  padding: 16px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  font-variant: tabular-nums;
  box-sizing: border-box;
  .ant-select-selection-selected-value {
    position: absolute;
    top: 0;
    left: 0;
  }
`
