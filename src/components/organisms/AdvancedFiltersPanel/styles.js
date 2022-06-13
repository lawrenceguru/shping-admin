import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const FilterPanelWrapperButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-basis: 94% !important;
  align-items: center;
  & > button {
    margin-left: 10px;
  }
`

export const DefaultFilterFieldsWrapper = styled.div`
  flex-basis: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  & .antSelect {
    width: 50%;
    margin: auto;
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
  & .ant-select {
    flex-basis: 80%;
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
  & .antSelect {
    width: 50%;
    margin: auto;
  }
`

export const DefaultFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

export const IndexFields = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    flex-basis: 33%;
    margin-bottom: 20px;
    & .antSelect,
    & > input,
    span {
      flex-basis: 80%;
      & > input {
        text-align: start;
      }
    }
  }
`

export const OwnerTitle = styled.div`
  flex-basis: 33%;
`
