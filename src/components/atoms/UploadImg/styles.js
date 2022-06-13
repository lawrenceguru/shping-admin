import styled from 'styled-components'

export const ErrorWrapper = styled.div`
  margin-bottom: 20px;
`

export const SpinnerWrapper = styled.div`
  display: inline-flex;
  & .ant-spin-nested-loading {
    display: inline-block;
  }
  & svg {
    color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin.ant-spin-show-text .ant-spin-dot {
    margin: 0;
    top: 30%;
    left: 35%;
  }
`
export const IconWrapper = styled.div`
  display: flex;
  & svg {
    margin-bottom: 70px;
    height: 15px;
  }
`
