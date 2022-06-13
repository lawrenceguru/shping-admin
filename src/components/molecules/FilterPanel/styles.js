import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-size: 14px;
  & label {
    color: rgb(178, 179, 178) !important;
    font-weight: 600;
  }
  & .ant-select-selection__rendered {
    color: rgb(178, 179, 178);
    font-size: 16px;
  }

  & .ant-input:placeholder-shown {
    color: rgb(178, 179, 178);
    font-family: Roboto;
  }
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & .clear-all {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 42px;
    width: 90px;
    margin-left: 20px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
  & .clear-all:hover,
  & .clear-all:focus,
  & .clear-all:active {
    background-color: #fff !important;
    border-color: #b3b3b333 !important;
  }
  & .clear-all.disable {
    background-color: #f2f2f2 !important;
    border-color: #b3b3b333 !important;
  }
  & .clear-all.disable:hover,
  & .clear-all.disable:focus,
  & .clear-all.disable:active {
    background-color: #f2f2f2 !important;
    border-color: #b3b3b333 !important;
  }
  & .ant-btn:not([disabled]).not(.clear-all):active,
  & .ant-btn:not([disabled]).not(.clear-all):hover {
    background-color: #ef3d46;
  }
  & .ant-input:placeholder-shown,
  .ant-calendar-input-wrap {
    color: rgb(178, 179, 178);
    height: 40px;
    padding: 6px 11px;
    font-size: 16px;
    & .ant-select-enabled {
      width: 100%;
    }
  }
  & .ant-checkbox + span {
    color: rgb(178, 179, 178);
    font-weight: 600;
  }
`
export const DefaultFilterPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-basis: ${({ isHaveNotPlaceholderForChildren }) => (isHaveNotPlaceholderForChildren ? '100%' : '80%')};

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const DefaultFilterFieldsWrapper = styled.div`
  flex-basis: ${({ isHaveNotPlaceholderForChildren }) => (isHaveNotPlaceholderForChildren ? '100%' : '85%')};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & .ant-select {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
  }
  & .ant-select-open,
  & .ant-select > .ant-select-selection {
    color: rgb(178, 179, 178) !important;
  }
  & .ant-select-selection--single {
    height: 40px !important;
  }
  & .ant-select-selection__rendered {
    line-height: 40px;
  }
  & .antSelect {
    width: 50%;
    margin: auto;
  }
`

const getMainFiledBasis = value => {
  switch (value) {
    case 4:
      return '22%'
    case 5:
      return '16%'
    default:
      return '30%'
  }
}

export const DefaultField = styled.div`
  flex-basis: ${({ numberOfFileds }) => getMainFiledBasis(numberOfFileds)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  & > svg {
    flex-basis: 15%;
    cursor: pointer;
  }
`

export const DefaultFields = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

export const IndexFields = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & .ant-row {
    flex-basis: 80%;
    margin-bottom: 0 !important;
  }
  & > div {
    flex-basis: 33%;
    margin-bottom: 20px;
    justify-content: flex-start;
    & > .ant-select,
    & > input,
    span {
      flex-basis: 80%;
      font-weight: 400;
      & > input {
        text-align: start;
      }
    }
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

export const FiledsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & input {
    flex-basis: 45%;
  }
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .ant-calendar-picker {
    margin-bottom: 15px;
  }
`
