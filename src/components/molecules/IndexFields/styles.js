import styled from 'styled-components'

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 20px;
`

export const RowStart = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 20px 0px 20px;
`

export const ButtonsWrapper = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 0px 20px;
  & button {
    flex-basis: 45%;
    height: 40px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    color: #b3b3b3;
  }
  & .add-btn:focus,
  & .add-btn:hover {
    border-color: #b3b3b3;
    color: #b3b3b3;
  }
  & .save-btn {
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
    color: #fff;
  }
  & .save-btn:focus,
  & .save-btn:hover {
    border-color: #ff7875;
    background-color: #ff7875;
    color: #fff;
  }
  & .fake-delete-button {
    flex-basis: 10%;
  }
`

export const Buttons = styled.div`
  flex-basis: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .ant-btn.save-btn:hover,
  .ant-btn.save-btn:focus {
    border: none;
  }
`

export const StyledTitle = styled.div`
  flex-basis: 40%;
  font-family: Roboto;
  font-size: 25px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  color: #b3b3b3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }
`

export const CustomInputs = styled.div`
  flex-basis: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .ant-input,
  & .ant-input:focus {
    border: none;
    box-shadow: none;
  }
`
