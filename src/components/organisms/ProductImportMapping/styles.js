import styled from 'styled-components'

export const Header = styled.h2`
  flex-basis: 100%;
  font-size: 20px;
  font-weight: 900;
  margin-top: 0.5em;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: flex;
  justify-content: space-between;
`

export const Column = styled.div`
  background: #fff;
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
`

export const TwoColumns = styled.div`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 48%;
  flex-direction: row
  justify-content: space-between;
  padding: 20px 30px 30px 30px;

  .ant-form-item {
     flex-basis: 49%;
  }
`
