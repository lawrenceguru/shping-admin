import styled from 'styled-components'

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 100%;
    margin-right: 20px;
  }
`
