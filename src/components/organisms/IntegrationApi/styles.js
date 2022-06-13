import styled from 'styled-components'

export const StyledForm = styled.div`
  flex-basis: 100%;
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-left: 10px;
  margin-bottom: 40px;
  & form {
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
    & .ant-tag-close-icon,
    & .anticon-plus {
      height: auto;
    }
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 100%;
`
