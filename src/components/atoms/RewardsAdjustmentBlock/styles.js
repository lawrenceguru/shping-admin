import styled from 'styled-components'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.h3`
  font-size: 15px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`
export const FieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div,
  input {
    flex-basis: 48%;
  }
`
