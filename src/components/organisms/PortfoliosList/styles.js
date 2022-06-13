import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-size: 14px;
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  & > .spinner {
    top: 150px;
  }
`
