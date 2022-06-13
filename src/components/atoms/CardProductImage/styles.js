import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const StyledImage = styled.img`
  width: ${props => props.width || '100px'};
  max-width: ${props => props.maxWidth || '120px'};
  max-height: ${props => props.maxHeight || '120px'};
`
