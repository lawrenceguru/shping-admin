import styled from 'styled-components'

export const StyledLangText = styled.div`
  line-height: 13px;
`

export const StyledLangMenu = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  vertical-align: center;
  div {
    font-size: 13px;
    padding-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const StDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > .ant-select > .ant-select-selection,
  & > .ant-select > .ant-select-selection:focus,
  & > .ant-select > .ant-select-selection:active {
    border: none;
    box-shadow: none;
  }
  .ant-select-selection-selected-value {
    font-weight: normal;
  }
`

export const Loading = styled.div`
  width: 30px;
  height: 35px;
  & .spinner {
    width: 30px;
    height: 35px;
    position: relative;
    margin: 0;
    font-size: 50px;
    & > div {
      width: 2px;
      margin-right: 2px;
    }
  }
`
