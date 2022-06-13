import styled from 'styled-components'

export const HeaderPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
`

export const TypeImage = styled.div`
  & img {
    height: 30px;
    width: 30px;
  }
`

export const ButtonsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-between;
  flex-basis: 30%;
  max-width: 30%;
  & > div {
    width: 45px;
  }
  & > div:nth-child(2) {
    border-width: 0px 1px;
    border-color: rgb(178, 179, 178);
    border-style: solid;
  }
  @media (max-width: 1024px) {
    flex-basis: 30%;
    max-width: 30%;
  }
`
