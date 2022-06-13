import styled from 'styled-components'

export const GroupNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > div:first-child {
      flex-basis: 90%;
      margin-bottom: 0px;
    }
  }
`

export const PropertiesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const DeleteIngredientWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-origin: padding-box, border-box;
  box-shadow: inset 0 0 0 1px #fafafa, 3px 3px 4px 0px #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  & .ant-form-item {
    margin-bottom: 0;
  }
`

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div:first-child {
    flex-basis: 85%;
  }
  & > label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
    margin-left: 5px;
  }
`

export const GroupWrapper = styled.div`
  margin-bottom: 30px;
`
