import styled from 'styled-components'

export const TableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & span {
    flex: 1 0 auto;
  }
`

export const StyledSelectsOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 600;
  & .ant-select > .ant-select-selection:focus,
  & .ant-select > .ant-select-selection,
  & .ant-select > .ant-select-selection:active,
  & .ant-select-selection div,
  & .ant-input,
  & .ant-input:focus {
    border: none;
    box-shadow: none;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    padding: 0 8px;
  }
`
