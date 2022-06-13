import styled from 'styled-components'

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CheckWrapper = styled.div`
  flex-basis: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;
`

export const NameWrapper = styled.div`
  flex-basis: 20%;
  margin-left: 10px;
`

export const ValueWrapper = styled.div`
  flex-basis: 20%;
  margin-left: 10px;
`

export const UnitWrapper = styled.div`
  flex-basis: 10%;
  margin-left: 10px;
`

export const LevelWrapper = styled.div`
  flex-basis: 30%;
  margin-left: 10px;
`

export const RatingWrapper = styled.div`
  display: flex;
  & > div {
    flex-basis: 30%;
  }
`

export const PerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    flex-basis: 30%;
  }
`

export const NumberOfFieldsWrapper = styled.div`
  display: flex;
  & > div {
    flex-basis: 30%;
  }
`
