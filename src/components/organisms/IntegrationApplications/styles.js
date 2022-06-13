import styled from 'styled-components'

export const StyledForm = styled.div`
  flex-basis: 100%;
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-left: 10px;
  margin-bottom: 40px;
  & .mb-10 {
    margin-bottom: 10px;
  }
  & h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin: 10px 0px;
    color: rgba(0, 0, 0, 0.65);
  }
  & form {
    & button {
      padding: 5px 30px;

      background: #ef3d;
      border-radius: 4px;
      font-family: 'Arial';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      margin-top: 10px;
    }
    & .ant-checkbox-checked .ant-checkbox-inner {
      color: #fff;
      border-color: #ff4d4f;
      background: #ff4d4f;
    }
    & .activeStatus {
      color: green;
    }
    & .floatDiv {
      & .ant-col-6:first-child {
        padding-right: 0 !important;
        border-bottom: 1px solid #cccccc;
        & div {
          margin-top: 25px;
          margin-left: 5px;
        }
      }
      & .ant-col-6:last-child {
        padding-left: 0 !important;
        border-bottom: 1px solid #cccccc;
        & input {
          border: 0 !important;
          margin-top: 18px;
          margin-left: 5px;
        }
      }
    }
  }
  //   & form {
  //     & label {
  //       font-size: 15px;
  //       font-weight: 900;
  //       color: rgba(0, 0, 0, 0.65) !important;
  //     }
  //     & div > span > span {
  //       margin: 0;
  //       height: 40px;
  //     }
  //     & div > div > div > .ant-form-item-children > span {
  //       font-weight: 900;
  //     }
  //     & .ant-tag-close-icon,
  //     & .anticon-plus {
  //       height: auto;
  //     }
  //   }
`
export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: 'Roboto';
  font-style: normal;
`
