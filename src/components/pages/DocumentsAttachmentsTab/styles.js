import styled from 'styled-components'

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  .ant-select-lg {
    min-width: 100%;
  }
  & :last-child {
    margin-bottom: 0;
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
  & input {
    max-width: 30%;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 100%;
  & > div:last-child {
    display: flex;
  }
  & > div {
    & :last-child {
      & > button {
        width: 140px;
      }
    }
    & > div {
      & > button {
        width: 100%;
      }
    }
  }
`

export const ConditionsWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`
