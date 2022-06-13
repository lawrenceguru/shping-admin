import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #fff;
  ${({ isCursorPointer }) => isCursorPointer && 'cursor: pointer;'};
  margin-bottom: 20px;
  min-height: 100px;
  border: 1px solid transparent;
  & > div,
  & > img {
    padding: 15px;
  }
  &:hover {
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
  }
`

export const MainInfo = styled.div`
  flex-basis: ${({ isAdditionalFields }) => (isAdditionalFields ? '50%' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SubInfoWrapper = styled.div`
  ${({ isAdditionalFields }) => isAdditionalFields && '  border-right: 1px solid #00000014;'};
  & > span {
    margin-bottom: 10px;
  }
`

export const MainText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
  margin-bottom: 20px;
`

export const SecondaryInfo = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  & > span {
    margin-bottom: 10px;
  }
  & :last-child {
    margin-bottom: 0px;
  }
`

export const IconWrapper = styled.span`
  position: relative;
  flex-basis: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const InfoRow = styled.span`
  display: flex;
  align-items: center;
  & svg {
    font-size: 15px !important;
    margin-left: 10px !important;
  }
`
