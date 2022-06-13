import styled from 'styled-components'

export const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-weight: 600;
  & .ant-table-pagination.ant-pagination {
    margin: 16px -15px;
  }
  & .ant-table-thead > tr > th .ant-table-header-column {
    min-width: 35px;
  }
`

export const MainHeader = styled.h2`
  font-size: 30px;
  font-weight: 900;
`
export const SubHeader = styled.h3`
  font-size: 20px;
  font-weight: 400;
`
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;

  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 60%;
    left: 1%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  & > div {
    padding-left: 0;
    padding-right: 0;
  }
  & button {
    width: 140px;
  }
`
