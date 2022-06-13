import styled from 'styled-components'
import { SiglePageWrapperStyles, HeaderStyle } from '../../../styles'

export const Wrapper = styled.div`
  ${SiglePageWrapperStyles}
  margin-bottom: 50px;
`

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  & .spinner {
    top: 150px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    margin: 0 8px;
  }
`

export const Header = styled.h2`
  ${HeaderStyle}
`
