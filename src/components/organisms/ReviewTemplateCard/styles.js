import styled from 'styled-components'

export const CardWrapper = styled.div`
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

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: flex;
`

export const CardBody = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

export const Description = styled.p`
  margin-bottom: 5px;

  ${({ center }) => center && 'text-align: center;'};
`
export const StrongLabel = styled.strong`
  font-weight: bold;
  margin-right: 5px;
`
export const DeleteIcon = styled.span`
  float: right;
`
