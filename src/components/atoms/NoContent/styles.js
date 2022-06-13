import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const NoContentWrapper = styled.div`
  margin: 5px 0;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  font-size: ${props => props.fontSize || '14px'};
`
