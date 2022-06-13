import styled from 'styled-components'

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  background-color: #fff;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  border-radius: 10px;
  padding: 45px;
  & .ant-input:placeholder-shown {
    color: rgb(178, 179, 178);
    font-family: Roboto;
  }
  & .ant-select {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 18px;
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
  & .ant-select-selection:hover,
  & .ant-input,
  & .ant-input:focus {
    box-shadow: none;
    border-color: rgb(178, 179, 178);
  }
  & .ant-form-item-label > label {
    color: rgb(178, 179, 178);
  }
  & .ant-input:placeholder-shown {
    color: rgb(178, 179, 178);
    font-family: Roboto;
  }
  & .ant-input[disabled] {
    cursor: default;
  }
`

export const StyledError = styled.span`
  display: block;
  color: #ef3d46;
  margin-top: 5px;
  height: 10px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 2px;
  margin-top: 5px;
`
