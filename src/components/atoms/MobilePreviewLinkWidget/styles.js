import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  border: ${props => (props.isWithImage ? 'none' : '2px solid #f9f9f9')};
  width: ${props => (props.isWithImage ? '100%' : '215px')};
  text-overflow: ellipsis;
  & > img:first-child {
    height: 25px;
    margin-right: 5px;
  }
  & img {
    max-width: 240px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
      max-width: 340px;
    }
  }

  a,
  a:hover {
    color: #354052;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
