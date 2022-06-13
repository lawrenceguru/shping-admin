import styled from 'styled-components'

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

export const MapContainer = styled.div`
  margin-top: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 10px 10px 6px 6px;
  flex-shrink: 0;
`
