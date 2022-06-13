import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  & .ant-table-row {
    cursor: pointer;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & > div {
    padding-left: 0;
  }
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const ModalHeader = styled.h3`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 900;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.85);
`
