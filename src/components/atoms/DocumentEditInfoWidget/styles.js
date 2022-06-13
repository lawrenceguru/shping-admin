import styled from 'styled-components'

export const TitleFieldWrapper = styled.div`
  display: flex;
  flex-wrap: flex;
  justify-content: space-between;
  & input {
    flex-basis: 90%;
  }
  & > div {
    position: relative;
    flex-basis: 5%;
  }
`

export const ButtonWrapper = styled.div`
  & > div {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
  }
`
