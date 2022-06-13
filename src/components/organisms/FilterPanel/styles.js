import styled from 'styled-components'

export const FilterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
  margin-left: 25px;
  position: relative;
  background-color: #f4f4f4;
  & > div:first-child {
    margin: 0 auto;
    overflow: visible;
    & > span,
    & > div {
      margin-right: 30px;
    }
  }
  & div,
  & input,
  & .calendar-dropdown,
  & button {
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    color: #b3b3b3;
  }
  ,
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div {
    border: none;
  }
  & .ant-select-selection__rendered {
    line-height: 32px;
  }
  & .ant-calendar-picker {
    position: relative;
  }
  @media (max-width: 1899px) {
    & > div > div,
    & > div > span,
    & button {
      margin-top: 20px;
    }
  }
`

export const InputContainer = styled.div`
  width: 200px;
  display: inline-block;
`
