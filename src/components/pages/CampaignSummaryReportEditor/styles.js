import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const StyledForm = styled.form`
  flex-basis: 60%;
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  font-family: 'Roboto';
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

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`
export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
`

export const SecondColumn = styled.div`
  display: flex;
  position: sticky;
  top: 80px;
  height: fit-content;
  flex-basis: 30%;
  width: 100%;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    display: flex;
  }
  & > div > div:last-child {
    padding-right: 0;
  }
  & button {
    width: 140px;
  }
`
