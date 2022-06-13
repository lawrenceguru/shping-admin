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
`
export const DocumentInfoWrapper = styled.div`
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

export const IndexFieldsInfo = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const IndexField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 10%;
  word-break: break-word;
`

export const DeleteIcon = styled.span`
  position: relative;
  flex-basis: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const StyledDocumentIcon = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
