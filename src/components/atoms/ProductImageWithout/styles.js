import styled from 'styled-components'

export const StyledImageContainer = styled.div`
  height: 52px;
  padding: 5px 25px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`

export const StyledImage = styled.img`
  width: 40px;
  height: 40px;
  font-size: 10px;
  margin: 0 auto;
`

export const StyledContainerProductPhoto = styled(StyledImageContainer)`
  display: flex;
`
