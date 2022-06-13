import styled from 'styled-components'
import { Modal } from 'antd'

// eslint-disable-next-line import/prefer-default-export
export const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    margin-top: 20px;
  }
  .ant-modal-body {
    max-height: 500px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 16px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    &::-webkit-scrollbar-track:hover {
      background-color: #f4f4f4;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 5px solid #fff;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #a0a0a5;
      border: 4px solid #f4f4f4;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
  .ant-modal-footer {
    ${props => !props.isBottomBorder && 'border: none'};
    padding-bottom: 20px;
  }
  .ant-modal-title {
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    font-weight: 900;
  }
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
