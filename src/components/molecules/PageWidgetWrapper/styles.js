import styled from 'styled-components'

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    padding-right: 0px;
  }
  & button {
    width: 170px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    color: #b3b3b3;
  }
`

export const StyledWidgetsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > div {
    text-align: center;
    flex-basis: 25%;
  }
  & > div:nth-child(n + 5) {
    margin-top: 20px;
  }
  & > div:hover {
    color: #b3b3b3;
  }
`

export const ContentWrapper = styled.div`
  margin-bottom: 30px;
`
