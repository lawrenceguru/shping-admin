import styled from 'styled-components'

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

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
export const Description = styled.div`
  margin: 5px 0;
  font-size: 16px;
  & p {
    margin: 0;
  }
`
