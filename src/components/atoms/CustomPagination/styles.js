import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  & > .ant-btn {
    width: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  & > .ant-btn:first-child {
    margin-right: 8px;
  }
  & > .ant-btn:last-child {
    margin-left: 8px;
  }
`
