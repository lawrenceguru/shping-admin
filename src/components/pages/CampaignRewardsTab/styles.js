import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
  .ant-spin {
    max-height: 100% !important;
  }
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div,
  & .ant-input,
  & .ant-input:focus {
    border: none;
    box-shadow: none;
  }
  & .ant-select-open {
    color: rgba(0, 0, 0, 0.65);
  }
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus {
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
  & .clear-all.disable {
    background-color: #f2f2f2;
  }
  .ant-table-row {
    cursor: pointer;
  }
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const RewardsIndicatorsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  & h3 {
    font-size: 20px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
  & span {
    font-size: 30px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
`

export const RewardsIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FilterPanelWrapper = styled.div`
  & > div {
    & > div:last-child {
      justify-content: space-between;
      & > div {
        flex-basis: 30% !important;
      }
    }
  }
  & div > div:last-child > div:last-child {
    flex-basis: 100% !important;
    & > div:last-child {
      flex-basis: 100% !important;
    }
  }
  .ant-select-lg {
    flex-basis: 100% !important;
  }
  & > div > div > div > div > div {
    ${({ count }) => (count > 2 ? 'flex-basis: 30%;' : 'flex-basis: 45%;')}
  }
`
export const ButtonWrapper = styled.div`
  & > div {
    padding-left: 0;
  }
`
