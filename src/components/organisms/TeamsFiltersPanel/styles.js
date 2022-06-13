import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  margin: 30px auto;
  width: 100%;
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
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
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
  & .clear-all:hover,
  & .clear-all:focus,
  & .clear-all:active {
    background-color: #fff !important;
    border-color: #b3b3b333 !important;
  }
  & .clear-all.disable {
    background-color: #f2f2f2 !important;
    border-color: #b3b3b333 !important;
  }
  & .clear-all.disable:hover,
  & .clear-all.disable:focus,
  & .clear-all.disable:active {
    background-color: #f2f2f2 !important;
    border-color: #b3b3b333 !important;
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
export const DefaultFilterPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-basis: 80%;
`

export const DefaultFilterFieldsWrapper = styled.div`
  flex-basis: 85%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  & .ant-select {
    width: 100%;
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
  }
  & .ant-select-open,
  & .ant-select > .ant-select-selection {
    color: rgb(178, 179, 178) !important;
    width: 100%;
  }
  & .ant-select-selection--single {
    height: 40px !important;
  }
  & .ant-select-selection__rendered {
    line-height: 40px;
  }
  & .ant-input-lg {
    width: 80%;
  }
`

export const DefaultField = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  & > svg {
    flex-basis: 15%;
    cursor: pointer;
  }
`
