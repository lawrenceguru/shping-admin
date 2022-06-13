import styled from 'styled-components'

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(244, 244, 244);
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
`

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > label:first-child {
    margin-right: 5px;
  }
`

export const ModalFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
