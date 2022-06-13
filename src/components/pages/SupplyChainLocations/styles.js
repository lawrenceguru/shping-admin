import styled from 'styled-components'

export const NoContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  height: 100%;
  & > div {
    flex-basis: 30%;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & .ant-table-tbody > tr:hover {
    cursor: pointer;
  }
`

export const TableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 900;
`

export const CreateButtonWrapper = styled.div`
  margin-right: auto;
  & > div {
    padding: 0;
  }
`

export const StyledSelectsContainer = styled.div`
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
