import styled from 'styled-components'

export const StyledForm = styled.form`
  flex-basis: 60%;
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

export const PickersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ant-form-item {
    flex-basis: 44% !important;
  }
  & .ant-calendar-picker,
  .ant-time-picker {
    width: 100%;
  }
`

export const TitleFieldWrapper = styled.div`
  display: flex;
  flex-wrap: flex;
  justify-content: space-between;
  & > div {
    position: relative;
    flex-basis: 5%;
  }
  & .ant-popover-inner-content {
    padding: 12px 16px !important;
  }
`

export const ButtonWrapper = styled.div`
  & > div {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
  }
`

export const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-basis: 94% !important;
`
