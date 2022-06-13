import styled from 'styled-components'

export const StyledContainer = styled.div`
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Wrapper = styled.div`
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  & input {
    width: 45%;
  }
  & > span {
    flex-basis: 35%;
  }
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div {
    box-shadow: none;
    border: none;
  }
  & .ant-select {
    font-size: 25px;
  }
  & .ant-select-selection__rendered {
    line-height: 50px;
    height: 100%;
  }
  & .ant-select-selection--single {
    height: 45px;
    width: 250px;
  }
`
