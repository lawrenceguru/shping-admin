import styled from 'styled-components'

export const Wrapper = styled.div`
  & .load-more-btn {
    height: 40px;
    border-color: rgb(239, 61, 70);
    color: white;
    background-color: rgb(239, 61, 70);
  }
  & .load-more-btn:hover,
  & .load-more-btn:active,
  & .load-more-btn:focus {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const IconBtnWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
  & div:last-child {
    margin-left: 15px;
  }
`
