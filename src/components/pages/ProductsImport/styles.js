import styled from 'styled-components'

export const StyledForm = styled.form`
  margin-top: 25px 10px;
  width: 100%;
  padding: 30px;
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
  justify-content: center;
  margin-top: 15px;
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
  & button {
    width: max-content !important;
  }
`
export const MainHeader = styled.h2`
  font-size: 30px;
  font-weight: 900;
`
