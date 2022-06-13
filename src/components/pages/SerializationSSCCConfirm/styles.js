import styled from 'styled-components'

export const Wrapper = styled.div``

export const WrapperText = styled.div`
  width: 90%;
  margin: auto;
  font-weight: bold;
  font-size: 16px;
  & > div {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    width: 40%;
  }
  & > div:first-child {
    margin-top: 47.5px;
  }
  & > div:last-child {
    margin-bottom: 70px;
  }
`
