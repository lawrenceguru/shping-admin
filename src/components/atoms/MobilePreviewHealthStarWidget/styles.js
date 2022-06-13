import styled from 'styled-components'

export const PerWrapper = styled.div`
  position: absolute;
  top: 48px;
  right: 3px;
  color: #000000cc;
  font-size: 9px;
`

export const StarsWrapper = styled.div`
  & > div:first-child svg {
    top: 30px;
    left: 4px;
  }
  & > div:nth-child(2) svg {
    top: 13px;
    left: 6px;
  }
  & > div:nth-child(3) svg {
    top: 4px;
    left: 23px;
  }
  & > div:nth-child(4) svg {
    top: 11px;
    left: 40px;
  }
  & > div:nth-child(5) svg {
    top: 30px;
    left: 44px;
  }
`

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Wrapper = styled.div`
  position: relative;
  width: ${props => (props.uncheckedCount === 5 ? 60 : 235 - props.uncheckedCount * 27)}px;
  height: 64px;
  margin-top: 20px;
`
export const CircleWrapper = styled.div`
  position: absolute;
  width: 70px;
  height: 74px;
  bottom: 0;
  left: ${props => (props.uncheckedCount === 0 ? '85px' : '0')};
  z-index: 2;
`
export const HideBorder = styled.div`
  position: absolute;
  right: -1px;
  left: 34px;
  bottom: 1px;
  top: 11px;
  background: white;
`

export const CircleFakeWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border: 1px solid black;
  border-radius: 50%;
  background: white;
`

export const CircleContentWrapper = styled.div`
  position: absolute;
  top: 1px;
  bottom: 1px;
  right: 1px;
  left: 1px;
  overflow: hidden;
  border-radius: 50%;
  background: white;
`

export const Circle = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  left: 5px;
  height: 58px; // just because
  background: black;
  border-radius: 50%;
`

export const RatingValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  color: black;
`

export const Label = styled.div`
  position: absolute;
  bottom: 0;
  left: 5px;
  right: 5px;
  height: 30%;
  background: white;
  font-size: 8px;
  font-weight: bold;
  color: black;
  line-height: 9px;
`

export const BochkaFakeWrapper = styled.div`
  position: absolute;
  width: ${props => 200 - props.uncheckedCount * 28}px;
  top: 0;
  bottom: 0;
  right: 0;
  border: 1px solid black;
  z-index: 1;
`

export const BochkaWrapper = styled.div`
  position: absolute;
  width: ${props => 169 - props.uncheckedCount * 31}px;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 5;
`
