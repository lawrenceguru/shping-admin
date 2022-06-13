import styled from 'styled-components'

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ExistedImageWrapper = styled.div`
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  min-height: 100px;
  min-width: 80%;
  cursor: pointer;
  & img {
    margin: 20px 0;
    max-height: 200px;
    max-width: 300px;
    width: 20%;
  }
`

export const PreviewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  height: 170px;
`
