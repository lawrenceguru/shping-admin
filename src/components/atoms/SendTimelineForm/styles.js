import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  & label {
    font-size: 15px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65) !important;
  }
  & div > span > span {
    margin: 0;
    height: 40px;
  }
  & div > div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
  & .ant-form-item-children:first-child {
    top: 0px;
    bottom: 54px;
  }
`

export const Header = styled.h3`
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 900;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.65);
`
