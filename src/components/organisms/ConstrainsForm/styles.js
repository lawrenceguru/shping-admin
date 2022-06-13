import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & > :last-child {
    display: flex;
    justify-content: flex-end;
    flex-basis: 10%;
    padding-right: 0;
  }
  margin-bottom: 10px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-size: 14px;
  & .ant-select-selection__rendered {
    color: rgb(178, 179, 178);
    font-size: 16px;
  }
  & .ant-input:placeholder-shown {
    color: rgb(178, 179, 178);
    font-family: Roboto;
  }
  & .ant-btn:not([disabled]).not(.clear-all):active,
  & .ant-btn:not([disabled]).not(.clear-all):hover {
    background-color: #ef3d46;
  }
  & .ant-input:placeholder-shown,
  .ant-calendar-input-wrap {
    color: rgb(178, 179, 178);
    height: 40px;
    padding: 6px 11px;
    font-size: 16px;
  & .ant-select-enabled {
    width: 100%;
  }
`

export const TextboxsWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    flex-basis: 45%;
  }
  & .ant-select {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
  }
  & .ant-select-open,
  & .ant-select > .ant-select-selection {
    color: rgb(178, 179, 178) !important;
  }
  & .ant-select-selection--single {
    height: 40px !important;
  }
  & .ant-select-selection__rendered {
    line-height: 40px;
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
`
export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  & > .spinner {
    top: 150px;
  }
`
