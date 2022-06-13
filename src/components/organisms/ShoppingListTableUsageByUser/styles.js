import styled from 'styled-components'
import React from 'react'

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const TableWrapper = styled(({ pagination, ...props }) => <div {...props} />)`
  flex-basis: calc(50% - 30px);
  min-height: 925px;
  @media (max-width: 1440px) {
    flex-basis: calc(100% - 30px);
  }
  & .ant-pagination-item-active {
    background: transparent !important;
  }
  & .ant-modal-title,
  & .modal-main-text,
  & .modal-text {
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    color: #666666;
  }
  & .modal-text {
    color: #b3b3b3;
    height: 30px;
  }
  & .line {
    width: 2px;
    height: 260px;
    background-color: #f5f5f5;
    margin-right: 22px;
  }
  & .table-product .ant-table-body > table > thead > tr:nth-child(1) > th:nth-child(1) {
    text-align: center;
  }
  & .table-product .ant-table-body > table > tbody > tr > td:not(:nth-child(3)) {
    width: 150px;
    max-width: 150px;
    margin: 0 auto;
  }
  thead > tr:nth-child(1) > th:nth-child(1) {
    padding-left: 35px;
  }
  & .table-product thead > tr:nth-child(1) > th:nth-child(1) {
    padding-left: 25px;
  }
  .sales-table .ant-table-thead {
    display: none;
  }
  & .ant-table-title {
    padding: 0;
    border-bottom: 2px solid #f5f5f5;
  }
  & .sales-table .ant-table-thead {
    display: none;
  }
  & .ant-table-thead > tr > th {
    padding: 10px 16px;
    background: #fff;
    font-family: Roboto;
    font-weight: 500;
    letter-spacing: normal;
    color: #666666;
  }
  & .ant-table-tbody > tr > td {
    font-size: 13px;
    font-weight: bold;
    color: #b3b3b3;
  }
  & .ant-table-tbody {
    height: ${({ pagination }) => (pagination ? 'calc(100% - 102px)' : '100%')};
    overflow-x: hidden;
    overflow-y: auto;
  }
  & .ant-table-header-column {
    color: #000000c9;
    font-weight: 500;
  }
  & .ant-table-wrapper {
    height: 100%;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  & .ant-table-placeholder {
    height: calc(100% - 52px);
  }
  & .ant-empty-normal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 52px);
  }
  & .ant-table-footer {
    padding: 0;
    ${({ pagination }) => (pagination ? 'padding-left: 10px;' : '')}
  }
  & .ant-spin-nested-loading,
  & .ant-table,
  & .ant-spin-container,
  & .ant-table-wrapper,
  & .ant-spin-container,
  & .ant-table-title,
  & .ant-table-content,
  & .ant-table-footer {
    background-color: transparent !important;
  }
  & .ant-spin-nested-loading,
  & .ant-table,
  & .ant-spin-container,
  & .ant-table table,
  & .ant-table-body {
    height: 100%;
  }
  & .ant-table-empty .ant-table-body {
    height: initial;
  }
  & .ant-table-content {
    height: calc(100% - ${({ pagination }) => (pagination ? '102px' : '52px')});
  }
  @supports (-moz-appearance: none) {
    & .ant-table-content {
      height: calc(100% - ${({ pagination }) => (pagination ? '102px' : '100px')});
    }
  }
  & .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  & .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  & .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  & .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: unset !important;
  }
  & .ant-table-tbody,
  & .ant-table-footer {
    background-color: #fff !important;
    cursor: default;
  }
`
export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px 15px 11px 35px;
  background-color: #fff;
`

export const HeaderBlockProductTable = styled(HeaderBlock)`
  padding: 15px 15px 11px 50px;
`

export const Header = styled.div`
  font-weight: bold;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 1rem;
`

export const Footer = styled.div`
  height: 86px;
  display: grid;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
`
