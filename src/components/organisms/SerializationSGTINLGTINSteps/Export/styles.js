import styled from 'styled-components'

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    width: 100%;
    margin-right: 20px;
  }
`
