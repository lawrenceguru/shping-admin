import styled from 'styled-components'

export const ThirdRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`

export const NameWrapper = styled.div`
  flex-basis: 85%;
  padding-left: ${props => props.isPadding};
  width: 65px;
`

export const GdtiWrapper = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: 5px;
  padding-top: ${props => props.isPadding};
  & > label {
    display: ${props => (props.isAdvancedMode ? 'flex' : 'block')};
    justify-content: center;
    align-items: center;
  }
`

export const UnitWrapper = styled.div`
  flex-basis: 12%;
`

export const ValueWrapper = styled.div`
  flex-basis: 16%;
  position: relative;
  & input: {
    padding-right: 23px;
  }
  & .ant-popover-inner-content {
    width: 270px;
  }
`

export const RdiWrapper = styled.div`
  flex-basis: 15%;
`

export const LessWrapper = styled.div`
  flex-basis: 7%;
  padding-top: 10px;
`

export const ButtonsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: 10%;
  max-width: 10%;
  & > div {
    align-items: normal;
    padding-top: 7px;
  }
`

export const NutritionStaffWrapper = styled.div`
  flex-basis: ${props => (props.isAdvancedMode ? '100%' : '90%')};
  display: flex;
  flex-direction: ${props => (props.isAdvancedMode ? 'column' : 'row')};
  justify-content: space-between;
  box-shadow: ${props =>
    props.isAdvancedMode && props.isSubItem ? 'inset 0 0 0 1px #fafafa, 3px 3px 4px 0px #e8e8e8;' : 'none'};
  border-radius: ${props => (props.isAdvancedMode && props.isSubItem ? '10px' : 0)};
  padding: ${props => (props.isAdvancedMode && props.isSubItem ? '20px' : 0)};
  margin-bottom: ${props => (props.isAdvancedMode && props.isSubItem ? '20px' : '10px')};
  & div .ant-form-item {
    margin-bottom: 0px;
  }
`
export const AdvancedTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${props => (props.isSubItem ? '20px' : '25px')};
  margin-bottom: 10px;
`

export const NameGdtiWrapper = styled.div`
  flex-basis: 34%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => (props.isAdvancedMode ? '15px' : 0)};
  & > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

export const WarningWrapper = styled.div`
  position: absolute;
  top: 13px;
  z-index: 1;
  right: 10px;
  & path {
    color: #ef3d46;
  }
`
