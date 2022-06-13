import styled from 'styled-components'

export const Wrapper = styled.div`
  postition: flex;
  font-family: Roboto;
  font-weight: 600;
  & > div {
    max-width: initial;
  }
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 63%;
    left: 2%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
`

export const StyledForm = styled.div`
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  & .ant-form-item {
    margin-bottom: 0px;
  }
  & label {
    font-size: 15px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65) !important;
  }
  & div > span > span {
    margin: 0;
    height: 40px;
  }
  & div > div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
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
