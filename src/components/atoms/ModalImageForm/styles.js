import styled from 'styled-components'
import { Checkbox } from 'antd'
import IconButton from '../../molecules/IconButton'

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-height: 79vh;
`
export const IconButtonWrapper = styled(IconButton)`
  flex-direction: column;
`
export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  > div {
    margin: 0 20px;
  }
`

export const CustomSelectWrapper = styled.div`
  margin-bottom: 20px;
  overflow: auto;
  position: relative;
  max-height: 70vh;
`
export const ControlPanel = styled.div`
  display: flex;
`

export const BoundingBox = styled.div`
  margin: auto;
  cursor: auto;
  position: absolute;
  border: 6px solid #ff4c4f;
  background: rgba(255, 255, 255, 0.3);

  ${({ styles }) => `
        top: ${styles.top}px;
        left: ${styles.left}px;
        width: ${styles.width}px;
        height: ${styles.height}px;
    `};
`

export const BoundingBoxStage = styled.div`
  color: green;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  text-transform: capitalize;
`

export const BoundingBoxLabel = styled.span`
  top: -38px;
  left: 25px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  min-width: 130px;
  padding: 2px 10px;
  user-select: none;
  position: absolute;
  font-weight: normal;
  background: rgba(0, 0, 0, 0.5);
`

export const BoundingCheckbox = styled(Checkbox)`
  top: -30px;
  position: absolute;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff4c4f;
    border-color: #ff4c4f;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #ff4c4f;
  }
`
