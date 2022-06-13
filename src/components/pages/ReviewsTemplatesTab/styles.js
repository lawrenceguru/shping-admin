import styled from 'styled-components'

export const Description = styled('p')`
  margin-bottom: 5px;

  ${({ center }) => center && 'text-align: center;'};
`

export const StrongLabel = styled('strong')`
  font-weight: bold;
  margin-right: 5px;
`

export const SummaryContainer = styled.div`
  flex: 1;
  position: relative;

  ${({ theme }) => theme.media.tablet} {
    display: none;
    flex: 0;
  }
`

export const StickyWrapper = styled('div')`
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

export const StepContainer = styled('div')`
  display: flex;
  width: 70%;
  margin: auto;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  ${({ theme, active }) => active && `color: ${theme.colors.mainSecondary}`};
`

export const AddAnswer = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: start;

  & > p {
    margin-left: 10px;
    font-weight: bold;
  }
`

export const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  & .ant-table-pagination.ant-pagination {
    margin: 16px -15px;
  }
  & .ant-table-thead > tr > th .ant-table-header-column {
    min-width: 35px;
  }
  & .ant-select-open {
    color: rgba(0, 0, 0, 0.65);
  }
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus {
    background-color: #ff7875;
    border-color: #ff7875;
  }
  & .clear-all {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    height: 42px;
    width: 90px;
    margin-left: 20px;
    border: 1px solid #b3b3b333;
    background-color: #fff;
  }
  & .clear-all.disable {
    background-color: #f2f2f2;
  }
`

export const ExportButtonWrapper = styled.div`
  margin-right: auto;
  & > div {
    padding: 0;
  }
`
