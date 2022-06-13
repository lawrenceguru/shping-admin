import styled from 'styled-components'

export const ExistedVideoWrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  & video {
    max-height: 200px;
    max-width: 300px;
    margin: 20px 0;
  }
  & button[disabled] {
    background-color: #f1f1f1;
  }
`

export const ExistedImageWrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 100px;
  min-width: 80%;
  cursor: pointer;
  & img {
    margin: 20px 0;
    max-height: 200px;
    max-width: 300px;
  }
`

export const PreviewBlockWrapper = styled.div`
  margin-top: 10px;
`

export const PreviewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const RotateWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: absolute;
  top: -28px;
  right: -10px;
`
export const ButtonWrapper = styled.div`
  margin-bottom: 20px;
  position: absolute;
  top: -32px;
  right: 0px;
  font-weight: 400;
  color: rgb(178, 179, 178);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > button {
    height: 30px;
  }
`
