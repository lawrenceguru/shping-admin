import styled from 'styled-components'

export const WidgetInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #fff;
  color: #354052;
`

export const WidgetInfoWrapperBlock = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${props => (props.smallHeader ? '85%' : '35%')};
  height: 31px;
  background: #f4f4f4;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-bottom: 31px solid white;
    border-right: 31px solid #f4f4f4;
  }
`

export const WidgetInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-height: 30px;
  align-items: flex-start;
  & > video {
    max-width: 245px;
  }
`
