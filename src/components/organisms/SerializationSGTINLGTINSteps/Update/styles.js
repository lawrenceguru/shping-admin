import styled from 'styled-components'

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`

export const InfoProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
`

export const WidgetsWrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
`

export const AdditionalButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;

  button:first-child {
    margin-bottom: 10px !important;
  }
`
