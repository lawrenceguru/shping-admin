import styled from 'styled-components'

export default styled.div`
  padding: 8px;
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
