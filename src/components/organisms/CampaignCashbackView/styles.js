import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
  & .sub-title {
    margin-left: 300px;
    font-size: 18px;
  }
  & .sub-status {
    display: inline-block;
    float: right;
    margin-left: auto;
    margin-right: 0px;
    font-size: 18px;
    font-weight: normal;
  }
`
export const SubHeader = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`
export const Section = styled.div`
  width: 100%;
  background: rgb(255, 255, 255);
  padding: 30px;
  margin-bottom: 30px;
`
export const Table = styled.table`
  width: 100%;
  & tr {
    border: 0.5px solid #f0f0f0;
    &:nth-child(odd) {
      background-color: #fafafa;
    }
    & td {
      width: 25%;
      padding: 8px;
      &.products {
        .ant-table-thead > tr,
        .ant-table-tbody > tr,
        .ant-table-tbody > tr:hover,
        .ant-table-tbody > tr:hover > td,
        .ant-table-thead > tr > th {
          background: transparent;
          border: 0;
        }
        .ant-table-tbody > tr > td {
          color: rgba(0, 0, 0, 0.85);
          font-weight: normal;
        }
        .ant-table table {
          width: 100% !important;
        }
      }
    }
  }
`
export const QRWrapper = styled.div`
  width: 256px;
  margin: 0 auto;
`
export const Label = styled.span`
  font-weight: 700;
`
export const Left = styled.div`
  flex: 1 0 auto;
`
export const Right = styled.div`
  width: 316px;
  margin: 0 30px;
`
export const Actions = styled.div`
  display: flex;
`
export const ButtonWrapper = styled.div`
  font-family: 'Roboto';
  & > div {
    padding-left: 0;
  }
`
