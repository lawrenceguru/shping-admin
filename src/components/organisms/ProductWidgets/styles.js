import styled from 'styled-components'

export const ButtonsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 40px;
  & button:first-child {
    margin-right: 20px;
  }
  & button:nth-child(2).ant-btn {
    height: 40px;
    width: 130px;
    border-color: rgba(239, 61, 70, 0.8784313725490196);
    background-color: rgba(239, 61, 70, 0.8784313725490196);
    color: #fff;
    &:hover,
    &:focus {
      background-color: rgb(239, 61, 70);
      border-color: rgb(239, 61, 70);
    }
  }
  & button:nth-child(2).ant-btn[disabled] {
    background-color: #e6a2a5;
    border-color: #e6a2a5;
  }
  & button:first-child {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 44px;
    width: 140px;
    margin-left: 20px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
  & .anticon svg {
    color: #ef3d46 !important;
  }
`

export const EditForm = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  & form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-weight: 600;
    & .ant-input: focus,
    & .ant-input: hover,
    & .ant-select-selection__rendered: focus,
    & .ant-select-selection__rendered: hover {
      border-color: rgb(178, 179, 178);
    }
  }
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 63%;
    left: 2%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
`

export const BottomInfo = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1340px) {
    justify-content: space-between;
  }
`

export const WidgetsPanel = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  & > div {
    margin-bottom: 50px;
  }
  & > div,
  & .ant-spin-container > div {
    border-radius: 10px;
  }
  @media (max-width: 1340px) {
    flex-basis: 60%;
    flex-shrink: 0;
    max-width: 70%;
  }
`
