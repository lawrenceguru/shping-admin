import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & .ant-spin-dot {
    font-size: 20px !important;
    margin-top: 0px !important;
    top: 15% !important;
    left: initial !important;
  }
  & .ant-spin-text {
    display: none !important;
  }
`
export const StyledPopover = styled.span`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 400;
  display: inline-block;
  min-width: 90px;
`
