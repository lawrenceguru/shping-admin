import styled from 'styled-components'

const activeState = `
    cursor: pointer;
    box-shadow: rgba(0,0,0,0.12) 0px 1px 6px, rgba(0,0,0,0.12) 0px 1px 4px;
    & > img,
    & > div {
        display: block;
    }
`

export const List = styled.li`
  margin: 10px;
  max-width: 120px;
  width: 100%;
  position: relative;
  display: inline-block;
  & > svg {
    display: block;
    width: 100%;
  }
  &:focus {
    outline: none !important;
  }
`

export const IconWrapper = styled.div`
  position: relative;
  padding: 10px;
  ${({ active }) => active && activeState} &:hover {
    ${activeState};
  }
`

export const Image = styled.img`
  display: block;
  width: 100%;
  min-height: 90px;
`

export const Title = styled.p`
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
`
export const Accept = styled.div`
  width: 25px !important;
  height: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
  display: none;
`
