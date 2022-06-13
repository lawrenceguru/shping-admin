import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  > div:first-child {
    flex-basis: 60%;
  }
  & div > div > div:last-child {
    padding-right: 0;
  }
`

export const PreviewWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 80px;
  height: fit-content;
  flex-basis: 30%;
  width: 100%;
}
`
