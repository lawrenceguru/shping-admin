import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: 98px;
  font-family: Roboto;
  padding: 30px;
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
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const StyledForm = styled.form`
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  & .ant-form-item {
    margin-bottom: 10px;
  }
  & .ant-checkbox-wrapper {
    margin: 10px 0;
  }
  & label {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Roboto';
    // color: rgba(0, 0, 0, 0.65) !important;
    color: rgba(0, 0, 0, 0.85) !important;
  }
  & div > span > span {
    margin: 0;
    height: 40px;
  }
  & div > div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
  & .ant-calendar-picker {
    margin-top: 5px;
  }
`

export const SubHeader = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div:last-child {
    display: flex;
  }
  & > div {
    & > div {
      & > button {
        width: 140px;
      }
    }
  }
`
export const TwoInputsLabel = styled.div`
  font-size: 15px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65) !important;
`

export const Tabs = styled.div`
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
`
export const Liquid = styled.div`
  display: flex;
  flex: 0 1 auto;
  & h4 {
    flex-grow: 1;
  }
  & div {
    text-transform: capitalize;
    color: #ef3d46;
    &.active {
      color: #33a946;
    }
  }
`
