import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > div:last-child {
    display: flex;
  }
  & > div {
    & > div {
      & > button {
        width: 140px;
      }
    }
  }
`
