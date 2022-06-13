import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  font-family: Roboto;
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
`
export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  & > .spinner {
    top: 150px;
  }
`

export const Accept = styled.h2`
  display: flex;
  padding: 40px 20px;
  background: white;
  & .cashback {
    flex: 1 0 auto;
    cursor: pointer;
    display: flex;
  }
  & .actions {
    flex: 0 0 350px;
    & button {
      margin: 0 20px;
    }
  }
`
