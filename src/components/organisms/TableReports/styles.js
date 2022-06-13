import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 50px;
`

export const StyledChartBlock = styled.div`
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  & > :last-child {
    margin-top: 0;
  }
  & .ant-table-row {
    cursor: default;
  }
`
