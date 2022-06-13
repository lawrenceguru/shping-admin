import styled from 'styled-components'
import { Icon, PageHeader } from 'antd'

export const Wrapper = styled.div`
  border-left: 3px solid #6666660f;
  padding: 4px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1440px) {
    max-width: 1440px;
  }
  @media (max-width: 1024px) {
    max-width: 1024px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
  }
`

export const StyledPageHeader = styled(PageHeader)`
  span {
    padding-top: 8px;
    font-size: 1.3rem;
    font-weight: 500;
    color: #666666;
  }
`
export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StyledIcon = styled(Icon)`
  margin-left: 8px;
  font-size: 1.5rem;
  color: #d8d8d8;
`
