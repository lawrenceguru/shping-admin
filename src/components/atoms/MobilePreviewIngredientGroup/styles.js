import styled from 'styled-components'

export const IngredientsWrapper = styled.div`
  overflow-wrap: break-word;
  width: 100%;
  margin-top: 20px;
`

export const IngredientsBody = styled.div`
  font-size: 12px;
  > a:not(:first-child) {
    margin-left: 4px;
  }
`

export const IngredientItem = styled.a`
  color: #354052;
  cursor: default;
  ${({ allergen, isComponent }) => !isComponent && allergen && { color: 'red' }};
  ${({ description }) => description && { textDecoration: 'underline', cursor: 'pointer' }};
  :hover {
    color: ${props => (props.allergen ? 'red' : '#354052')};
    ${({ description }) => description && { textDecoration: 'underline', cursor: 'pointer' }};
  }
`

export const IngredientsDescription = styled.div`
  margin-top: 10px;
  font-size: 10px;
  font-weight: 500;
`

export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  text-align: ${props => (props.isComponent ? 'left' : 'justify')};
`
