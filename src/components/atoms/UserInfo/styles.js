import styled from 'styled-components'

export const StyledImageContainer = styled.div`
  height: 52px;
  padding: 5px 25px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  max-width: 100px;
`

export const StyledImage = styled.img`
  width: 40px;
  height: 40px;
  font-size: 10px;
  margin: 0 auto;
`

export const StyledContainerUserInfo = styled(StyledImageContainer)`
  border: none;
  background: transparent !important;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > div {
    display: flex;
    align-items: center;
  }
`

export const StyledUserImage = styled(StyledImage)`
  border-radius: 50%;
  margin-right: 20px;
`

export const StyledUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
