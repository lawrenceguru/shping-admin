import styled from 'styled-components'

export const FoldingValues = styled.span`
  ${({ child }) => !child && { fontWeight: 'bold' }}
  display: flex;
  justify-content: flex-end;
  flex-basis: 25%;
`

export const ClickButton = styled.button`
  position: absolute;
  left: -2px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  padding: 0;
  background: #feb5b5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  & img {
    position: relative;
    width: 10px;
    height: 10px;
    left: 0.15px;
  }
`

export const ItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px 0;
  text-align: left;
`

export const ItemChildWrapper = styled.div`
  padding-left: 15px;
  margin-left: 5px;
  flex: 1;
  font-weight: 300;
  text-decoration: ${props => (props.isGdti ? 'underline' : 'none')};

  &::before {
    content: '';
    position: absolute;
    height: 150%;
    top: -10%;
    left: 2.5%;
    width: 0;
    border: 0px solid #feb5b5;
    border-left-width: 1px;
  }
`

export const ItemNameWrapper = styled.span`
  padding-left: 20px;
  font-weight: bold;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  text-decoration: ${props => (props.isGdti ? 'underline' : 'none')};
`
