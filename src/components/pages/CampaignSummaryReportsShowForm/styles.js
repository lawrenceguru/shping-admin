import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const Header = styled.h2`
  font-size: 30px;
  margin-top: 30px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #ef3d46;
`

export const RewardsIndicatorsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  & h3 {
    font-size: 20px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
  & span {
    font-size: 30px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
`

export const RewardsIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
