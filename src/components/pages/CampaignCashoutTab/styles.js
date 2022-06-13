import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 50px;
  & .headerTitle {
    font-family: 'Roboto';
    color: #000000;
    font-weight: 900;
    font-size: 30px;
  }
  & .headerSubTitle {
    font-family: 'Roboto';
    color: #000000;
    font-weight: 700;
    font-size: 18px;
  }
  & .ant-spin {
    max-height: initial !important;
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
  & .ant-select-open {
    color: rgba(0, 0, 0, 0.65);
  }
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus {
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
  & .clear-all.disable {
    background-color: #f2f2f2;
  }
  .ant-table-row {
    cursor: pointer;
  }
  & .ant-upload-list-picture {
    margin-top: -23px;
  }
  & form.filter {
    flex: 0 0 200px;
    & .ant-form-item {
      margin-bottom: 0;
    }
  }
`

export const SwitchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > div {
    margin-top: 0;
  }
`

export const ButtonWrapper = styled.div`
  font-family: 'Roboto';
  & > div {
    padding-left: 0;
  }
`
export const DeleteIcon = styled.span`
  float: left;
`
export const Actions = styled.div`
  display: flex;
`
export const ViewPage = styled.div`
  background: white;
  padding: 20px;
  & {
    header {
      padding: 0 0 20px 0;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
    }
    .ant-col {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      padding: 10px 15px;
      border: 0.5px solid #f0f0f0;
    }
    .bgGray {
      background: #fafafa;
    }
    .activeDot,
    .inActiveDot {
      display: flex;
      align-items: center;
    }
    .activeDot span:first-child,
    .inActiveDot span:first-child {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #1890ff;
      border-radius: 33px;
      margin-right: 5px;
    }
    .inActiveDot span:first-child {
      background: #bfbfbf !important;
    }
  }
`
export const ProductStyle = styled.div`
  & {
    header {
      background: #ff4d4f;
      border-radius: 10px 10px 0px 0px;
      text-align: center;
      color: white;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      padding: 10px;
    }
    nav > div {
      padding: 10px;
      background: white;
      img {
        width: 100%;
        heigh: auto;
      }
    }
    nav > aside {
      img {
        width: 100%;
        height: auto;
      }
    }
    footer {
      .ant-col-12:first-child {
        color: #000000;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        padding-left: 5px;
      }
      .ant-col-12:last-child {
        text-transform: capitalize;
      }
      .ant-row {
        margin-top: 15px;
      }
    }
  }
`
