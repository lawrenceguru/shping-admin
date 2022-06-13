import styled from 'styled-components'
import { Icon } from 'antd'

export const LineTwo = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

export const StyledIconPercents = styled(Icon)`
  & svg {
    width: 30px;
    height: 25px;
  }
  margin-right: 5px;
  flex-basis: 5%;
`

export const StyledPercents = styled.span`
  margin-left: 10px;
  vertical-align: super;
  display: flex;
  flex-basis: 30%;
  @media (max-width: 1024px) {
    flex-basis: 15%;
  }
`

export const StyledText = styled.span`
  flex-grow: 1%;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  text-overflow: ellipsis;
`

export const ConversionClicksWrapper = styled.div`
  & .ant-table-thead {
    display: none;
  }
`
