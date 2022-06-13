import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const SwitchOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: center;
  flex-basis: 15%;
  & > span {
    margin-right: ${props => props.textMarginRight || '20px'};
    margin-left: ${props => props.textMarginLeft || '45px'};
    font-weight: 600;
  }
  @media (max-width: 1200px) {
    justify-content: flex-start;
    margin-top: 20px;
    width: 100%;
    & > span {
      margin-left: 0;
    }
  }
`
