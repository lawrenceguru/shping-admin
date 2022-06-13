import styled from 'styled-components'

export const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & span {
    padding-right: 0;
  }
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  & span {
    font-weight: 900;
    margin-left: 10px;
  }
`

export const Wrapper = styled.div`
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

export const FieldWrapper = styled.div`
  position: relative;
  width: 80%;
`
