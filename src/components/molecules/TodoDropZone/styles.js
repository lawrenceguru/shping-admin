import styled from 'styled-components'

const activeState = `
    cursor: pointer;
    box-shadow: rgba(0,0,0,0.12) 0px 1px 6px, rgba(0,0,0,0.12) 0px 1px 4px;
    & > img,
    & > div {
        display: block;
    }
`

const existImageState = `
    padding-bottom: 0px;
`

export const Wrapper = styled.div`
  &:focus {
    outline: none !important;
  }
  position: relative;
`

export const IconWrapper = styled.div`
  padding: 10px 0px;
  ${({ active }) => active && activeState} &:hover {
    ${activeState};
  }
  ${({ exist }) => exist && existImageState}
`

export const ImageWrapper = styled.div`
  padding: 0 10px;
`
export const ButtonWrapper = styled.div`
  &:focus {
    outline: none !important;
  }
  &:hover {
    & div > .ant-btn-sm {
      color: #fff;
      background-color: #ff7875;
      border-color: #ff7875;
    }
  }
  & div > .ant-btn-sm {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 30px;
    pointer-events: none;
  }
  & div > button > span {
    font-size: 12px;
    font-weight: 900;
  }
  & div {
    position: relative;
    height: 30px;
  }
`

export const PlaceholderDiv = styled.div`
  height: 20px;
`
export const Title = styled.p`
  ${({ existUrl }) => (existUrl ? 'margin-top: 0px' : 'margin-top: 10px')}
  text-align: center;
  font-weight: 600;
`
