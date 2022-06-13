import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 30px;
  & button {
    margin-left: 2px;
  }
`

export const ModalFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0 !important;
  }
`

export const SortByWrapper = styled.div`
  & .ant-select {
    font-size: 14px !important;
  }
`
