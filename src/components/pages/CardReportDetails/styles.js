import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  font-weight: 600;
  & > :last-child {
    margin-bottom: 20px;
  }
  & .spinner {
    margin-bottom: auto;
  }
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 20px 0;
  background-color: #ffffff;
`

export const SubHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const NoDataPlaceholderWrapper = styled.div`
  & > div {
    min-height: 300px;
  }
`
