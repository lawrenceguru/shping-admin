import styled from 'styled-components'

export const FieldsWrapper = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & > div:not(.spinner) {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & > div:first-child {
    flex-basis: 30%;
  }
  & > div:nth-child(2) {
    flex-grow: 1;
  }
  @media (max-width: 1024px) {
    flex-basis: 100%;
    flex-direction: column;
    & > div,
    & > div:first-child {
      flex-basis: 100%;
      width: 100%;
    }
    & > div:first-child {
      margin-bottom: 20px;
      width: 90%;
    }
  }
`

export const IndexFieldsHeader = styled.div`
  position: relative;
  flex-basis: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 30px;
  font-family: Roboto;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 30px;
`
