import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const StyledText = styled.div`
  margin-bottom: ${props => props.marginBottom || '20px'};
  font-size: 12px;
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top || '-28px'};
  right: 0px;
  font-weight: 400;
  color: rgb(178, 179, 178);
  & > div {
    ${props => props.textAlign && `text-align: ${props.textAlign}`};
  }
`
