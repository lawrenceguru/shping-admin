import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const RhfWrapper = styled.div`
  padding: 8px;
  flex-basis: 33%;
  & > span {
    margin-bottom: 15px;
  }
`

export const MapWrapper = styled.div`
  margin-top: 30px;
  max-height: 450px;
  width: 100%;
`

export const TitleMapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TitleMap = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: black;
`

export const RemainingWrapper = styled.div`
  position: relative;
  height: 18px;
  font-size: 16px;
  font-weight: bold;
  color: black;
`
