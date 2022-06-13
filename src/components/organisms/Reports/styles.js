import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const GraphsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  & > :first-child {
    flex-basis: 63%;
    background-color: #ffffff;
  }
  & > :last-child {
    flex-basis: 33%;
    background-color: #ffffff;
  }
  margin-bottom: 50px;
`
