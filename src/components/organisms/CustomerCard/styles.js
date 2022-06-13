import styled from 'styled-components'

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 25px;
  background-color: #ffffff;
  margin-bottom: 30px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  line-height: 2;
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 54%;
    left: 2%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin {
    max-height: initial;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`
export const User = styled.div`
  & button {
    margin-top: 30px;
    margin-left: 5px;
  }
  & .ant-btn-primary {
    height: 40px;
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

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    margin: 0 8px;
  }
`
export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 40%;
`
export const Description = styled.div`
  margin: 5px 0;
  font-size: 14px;
  & p {
    margin: 0;
  }
`

export const Header = styled.h3`
  font-size: 14px;
  font-weight: 900;
  margin: 0;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.85);
`

export const RefreshIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 5;
`

export const FlagsWrapper = styled.div`
  display: flex;
  flex-basis: 45%;
  justify-content: flex-start;
`
