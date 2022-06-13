import styled from 'styled-components'

export const Wrapper = styled.div`
  & > span {
    font-weight: 600;
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-size: 24px;
    margin-left: 8px;
  }
`

export const RhfWrapper = styled.div`
  padding: 8px;
  flex-basis: 33%;
  & > span {
    margin-bottom: 15px;
  }
`

export const RhfWrapperAddress = styled.div`
  flex-basis: 66%;
  padding: 8px;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
