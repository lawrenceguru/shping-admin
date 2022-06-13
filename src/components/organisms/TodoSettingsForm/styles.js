import styled from 'styled-components'

export const StyledForm = styled.form`
  flex: 2 1 0%;
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-left: 10px;
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
export const StyledText = styled.div`
  margin-left: 16px;
`

export const FieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & input {
    width: 60%;
  }
  & > div {
    row-direction: line;
    justify-content: flex-end;
    width: 20%;
    flex-basis: 35%;
    margin-top: 0 !important;
    & span {
      margin: 0 10px 0 0;
    }
  }
  & div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
`

export const SwitchWrapper = styled.div`
  & > div {
    justify-content: space-between;
  }
  & > div > span {
    margin: 0;
  }
`

export const ConditionsWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`
export const Wrapper = styled.div`
  display: flex;
`
