import styled from 'styled-components'

const SummaryContainer = styled.div`
  padding: 25px;
  flex: 1;
  position: sticky;
  top: 0;
  background: white;
  text-align: center;
`

const StickyWrapper = styled('div')`
  ${({ stickToBottom }) =>
    stickToBottom &&
    `
        position: absolute;
        width: 100%;
        bottom: 30px;
    `};

  ${({ stick }) =>
    stick &&
    `
        position: fixed;
        top: 80px;
        width: 26.1%;
    `};
`

const StepContainer = styled('div')`
  display: flex;
  width: 70%;
  margin: auto;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  ${({ theme, active }) => active && `color: ${theme.palette.secondary}`};
`

const AddAnswer = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: start;

  & > p {
    margin-left: 10px;
    font-weight: bold;
  }
  & > button {
    border-radius: 100px;
    border: 0px none;
    transition: all 0.3s ease 0s;
    float: right;
    box-shadow: rgb(37 37 37) 0px 0px 0px 2px inset, rgb(37 37 37) 0px 0px 0px 0px;
    color: rgb(255, 255, 255);
    background: rgb(37, 37, 37);
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 50px;
    height: 50px;
    &:hover {
      box-shadow: rgb(20 20 20) 0px 0px 0px 2px inset, rgb(20 20 20) 0px 0px 0px 2px;
      background: rgb(20, 20, 20);
    }
    &:focus {
      background: rgb(37, 37, 37);
    }
  }
`
export const Section = styled.div`
  display: block;
  & .switch .ant-form-item-control-input-content > div {
    justify-content: left;
  }
  & .ant-checkbox + span {
    color: rgba(0, 0, 0, 0.85);
  }
  & label[for='setting-form_image'] {
    font-weight: 900;
  }
`
export const StepWrapper = styled.div`
  padding: 20px;
  background-color: white;
  & .ant-input {
    border: 1px solid #d9d9d9;
    &:focus {
      border: 1px solid #d9d9d9;
    }
  }
`
export { SummaryContainer, StickyWrapper, StepContainer, AddAnswer }
