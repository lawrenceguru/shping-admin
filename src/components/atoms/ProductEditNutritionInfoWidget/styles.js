import styled from 'styled-components'

export const MainRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div:first-child {
    flex-basis: 60%;
  }
  & > div:nth-child(2) {
    flex-basis: 30%;
  }
`

export const SecondRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    flex-basis: 30%;
  }
`

export const NameGdtiWrapper = styled.div`
  flex-basis: 34%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const GdtiWrapper = styled.div`
  flex-basis: 10%;
`

export const TitlesWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & .ant-form-item {
    margin-bottom: 5px;
  }
`

export const HeaderPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  @media (max-width: 1024px) {
    width: 45%;
  }
  & > button {
    width: 80px !important;
    padding: 1px 5px !important;
    & > span {
      margin: 0 auto;
    }
  }
  & > div {
    margin-top: 5px;
    align-items: flex-start;
  }
`

export const ButtonWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
`
