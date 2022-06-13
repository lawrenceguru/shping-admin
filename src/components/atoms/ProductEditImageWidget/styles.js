import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ImageBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & div:nth-child(2) {
    flex-basis: 10%;
  }
`

export const StyledText = styled.div`
  margin-bottom: 20px;
  position: absolute;
  top: -28px;
  right: 0px;
  font-weight: 400;
  color: rgb(178, 179, 178);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const ErrorWrapper = styled.div`
  margin-bottom: 20px;
`

export const ExistedImageWrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 100px;
  min-width: 80%;
  & img {
    margin: 20px 0;
    max-height: 200px;
    max-width: 150px;
  }
`
