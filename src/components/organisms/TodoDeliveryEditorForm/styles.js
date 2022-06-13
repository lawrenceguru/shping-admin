import styled from 'styled-components'

export const StyledForm = styled.form`
  flex-basis: 60%;
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

export const InputWrapper = styled.div`
  padding-top: 20px;
  & > span {
    font-weight: 900;
  }
`

export const SliderWrapper = styled.div`
  & .ant-slider-rail {
    background-color: #feb5b5;
  }
  & .ant-slider-track {
    background-color: #fe494a;
  }
  & .ant-slider-step {
    background: transparent;
  }
  & .ant-slider-dot {
    border-color: #feb5b5;
  }
  & .ant-slider-dot-active {
    border-color: #fe494a;
  }
  & .ant-slider-handle {
    border-color: #fe494a;
  }
  & .ant-slider-handle:focus {
    border-color: #fe494a;
    box-shadow: 0 0 0 5px rgba(254, 73, 74, 0.2);
  }
  & .ant-slider:hover .ant-slider-track {
    background-color: #fe494a;
  }
  & .ant-slider:hover .ant-slider-rail {
    background-color: #feb5b5;
  }
  & .ant-slider:hover .ant-slider-handle {
    border-color: #fe494a;
  }
  & .ant-slider:hover .ant-slider-handle:focus {
    border-color: #fe494a;
  }
  & .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: #fe494a;
  }
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & .ant-input-lg {
    flex-basis: 48%;
  }
`

export const FieldWrapper = styled.div`
  flex-basis: 45%;
  padding-bottom: 20px;
  & > span {
    font-weight: 900;
  }
`

export const Header = styled.h3`
  font-size: 15px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`

export const ConditionsWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`

export const WrappedText = styled.div`
  margin-top: 20px;
  & h1 {
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
`

export const BudgetInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ant-input-lg {
    flex-basis: 60%;
  }
  % > span {
    flex-basis: 15%;
    font-weight: 900;
  }
`

export const PickersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ant-calendar-picker {
    flex-basis: 45% !important;
  }
`
