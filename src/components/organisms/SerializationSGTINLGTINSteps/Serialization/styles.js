import styled from 'styled-components'

export const Wrapper = styled.div`
  & .load-more-btn {
    height: 30px;
    border-color: rgb(239, 61, 70);
    color: white;
    background-color: rgb(239, 61, 70);
  }
  & .load-more-btn:hover,
  & .load-more-btn:active,
  & .load-more-btn:focus {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & > div:first-child {
    margin-top: 30px;
  }
`

export const WrapperText = styled.div``

export const RhfWrapper = styled.div`
  padding: 8px;
  flex-basis: 33%;
  & > span {
    margin-bottom: 15px;
  }
`

export const RhfAdditionalWrapper = styled.div`
  padding: 8px;
  flex-basis: 50%;
  & > span {
    margin-bottom: 15px;
  }
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const CheckboxWrapper = styled.div``

export const AdditionalWrapper = styled.div`
  display: flex;
  flex-basis: 66%;
  height: 101px;
  & > div:last-child {
    margin-left: 15px;
    margin-bottom: 46px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-basis: 100%;
`
