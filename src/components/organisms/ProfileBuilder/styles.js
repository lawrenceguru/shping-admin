import styled from 'styled-components'

export const ProfileBuilderWrapper = styled.div`
  height: fit-content;
  position: sticky;
  top: 120px;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  padding-right: 100px;
  @media (max-width: 1440px) {
    padding-left: 20px;
    padding-right: 0;
    margin-right: 20px;
  }
`

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ProfileBuilderHeader = styled.span`
  font-size: 25px;
  line-height: 30px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.65);
`

export const PopoverTitle = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 25px;
  font-weight: 600;
`

export const BackToWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 10px;
  visibility: ${props => (props.buttonVisible ? 'visible' : 'hidden')};
  opacity: ${props => (props.buttonVisible ? '1' : '0')};
  transition: visibility 0.5s, opacity 0.5s linear;
`

export const IconWrapper = styled.div``
