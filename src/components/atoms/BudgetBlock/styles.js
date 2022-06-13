import styled from 'styled-components'

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

export const Header = styled.h3`
  font-size: 15px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`
