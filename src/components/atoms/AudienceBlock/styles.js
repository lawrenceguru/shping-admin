import styled from 'styled-components'

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

export const WeeklyScansBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    flex-basis: 50%;
  }
`
