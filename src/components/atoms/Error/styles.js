import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const StyledError = styled.span`
  display: block;
  color: #ef3d46;
  margin-top: 5px;
  height: 10px;
  font-size: ${props => props.fontSize || '12px'};
  font-weight: 500;
  margin-left: 2px;
  margin-bottom: ${props => props.marginBottom || '5px'};
  margin-top: ${props => props.marginTop || '5px'};
`
