import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 60%;
    left: 1%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & > :first-child {
    margin-bottom: 20px;
  }
`

export const StoreCardInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  min-height: 100px;
  border: 1px solid transparent;
  & > div,
  & > img {
    padding: 15px;
  }
  &:hover {
    cursor: ${props => (props.showDatamatrix ? 'default' : 'pointer')};
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    box-shadow: ${props => (props.showDatamatrix ? 'none' : 'inset 0 0 0 1px #fafafa, 0 0 3px 1px #e8e8e8')};
  }
`

export const StyledStoreCardMainInfo = styled.div`
  flex-basis: ${props => (props.isAdditionalFields ? '25%' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #00000014;
  font-family: Roboto;
  font-weight: 600;
  & > :last-child {
    color: rgb(178, 179, 178);
  }
`

export const StyledMainStoreCardText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
`

export const DeleteIcon = styled.span`
  flex-basis: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const StyledStoreCardIcon = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
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
