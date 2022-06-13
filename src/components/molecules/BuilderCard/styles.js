import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`
export const ProductInfoWrapper = styled.div`
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

export const StyledProductMainInfo = styled.div`
  flex-basis: ${props => (props.isAdditionalFields ? '25%' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #00000014;
`

export const StyledMainProductText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
`

export const IndexFieldsInfo = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  & > div {
    flex-basis: 50%;
  }
`

export const IndexField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & > div:first-child {
    flex-basis: 40%;
  }
`

export const DeleteIcon = styled.span`
  flex-basis: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const StyledProductIcon = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
