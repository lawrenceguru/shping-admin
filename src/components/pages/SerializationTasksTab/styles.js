import styled from 'styled-components'

export const Wrapper = styled.div`
  & > div:last-child {
    margin-bottom: 30px;
  }
`

export const ActionWrapper = styled.div`
  display: flex;
  & > div:last-child {
    margin-left: 15px;
  }
`

export const StyledSelectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  & > div:first-child {
    padding: 0;
  }
`

export const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-btn-danger {
    width: 190px;
  }
  & > div:first-child {
    margin-right: 10px;
  }
  & > div {
    padding: 0;
  }
`
