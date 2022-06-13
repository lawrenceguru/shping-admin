import styled from 'styled-components'

export const Wrapper = styled.div`
  & > div:first-child {
    margin-top: 30px;
  }
`

export const HeaderWrapper = styled.div``

export const WrapperText = styled.div`
  width: 90%;
  margin: auto;
  font-weight: bold;
  font-size: 16px;
  & > div {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    width: 60%;
  }
  & > div:first-child {
    margin-top: 47.5px;
  }
  & > div:last-child {
    margin-top: 30px;
    margin-bottom: 70px;
  }
`
