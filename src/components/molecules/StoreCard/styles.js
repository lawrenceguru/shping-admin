import styled from 'styled-components'

export const Wrapper = styled.div`
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
  & .ant-btn:not([disabled]).not(.clear-all):active,
  & .ant-btn:not([disabled]).not(.clear-all):hover {
    background-color: #ef3d46;
  }
`
export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 0 20px;
  border: 1px solid transparent;
  & > div,
  & > img {
    padding: ${({ isDefault }) => (isDefault ? '0' : '15px')};
  }
  ${({ isDefault }) =>
    isDefault
      ? // eslint-disable-next-line max-len
        `
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 6px;
        box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
        `
      : 'border-bottom: 1px solid #00000014; font-weight: 400;'}
`

export const StyledCardMainInfo = styled.div`
  flex-basis: ${props => (props.isAdditionalFields ? '50%' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div,
  & > span {
    margin-bottom: 10px;
    padding: 0;
  }
`

export const StyledMainCardText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  ${({ isReceipt }) => (isReceipt ? 'font-weight: 900; font-size: 20px;' : 'font-size: 16px;')}
`

export const IndexFieldsInfo = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

export const StyledCardIcon = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
