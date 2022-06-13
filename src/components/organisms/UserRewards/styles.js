import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 30px;
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    margin: 0 8px;
  }
`
