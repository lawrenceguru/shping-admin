import styled from 'styled-components'

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${props => props.height};
  border-radius: 10px;
  margin-bottom: 50px;
  width: 100%;
  max-width: ${props => props.maxWidth};
  background-color: #fff;
  padding: 45px;
  & .ant-input:placeholder-shown {
    color: rgb(178, 179, 178);
    font-family: Roboto;
  }
  & .ant-select {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
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
    color: rgba(0, 0, 0, 0.65);
  }
  & .ant-input {
    color: rgba(0, 0, 0, 0.65);
    text-overflow: ellipsis;
    white-space: break-spaces;
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
  & .ant-select-selection div .ant-select-selection__placeholder,
  .ant-select-selection div .ant-select-search__field__placeholder {
    color: #bfbfbf;
  }
`

export const WidgetHeader = styled.span`
  font-size: 25px;
  line-height: 30px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 20px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`
