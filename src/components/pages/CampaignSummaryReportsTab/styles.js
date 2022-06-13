import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  width: 100%;

  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 60%;
    left: 1%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
`

export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #fff;
  color: rgb(178, 179, 178);
  margin-bottom: 20px;
  font-weight: 600;
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

export const StyledProductMainInfo = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  & > div,
  & > span {
    margin-bottom: 10px;
  }
`

export const StyledMainProductText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-weight: 900;
  font-size: 16px;
`

export const IndexFieldsInfo = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #00000014;
  justify-content: flex-start;
  align-items: flex-start;
  & > div,
  & > span {
    margin-bottom: 10px;
  }
`

export const DeleteIcon = styled.span`
  position: relative;
  flex-basis: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Header = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  & > div {
    padding-left: 0;
  }
`
