import styled from 'styled-components'

export const StyledIcon = styled.img`
  width: 40px;
  color: #e02d2d;
`

export const StyledImpressionsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const StyleImpressions = styled.div`
  z-index: 100000;
  position: relative;
  height: 52px;
  padding: 5px 25px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  max-width: 100px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 5px 35px;
  ${({ isInteractions }) => isInteractions && 'width: 100%;'}
  background: transparent !important;
  &:hover {
    background-color: #0000000a;
    cursor: ${({ numInteractions }) => (numInteractions ? 'pointer' : 'default')};
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
  }
`

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  & > div {
    position: relative;
    width: 120px;
    height: auto;
    max-height: 100%;
  }
  & img {
    max-width: 100%;
    width: auto;
    height: 100%
`
