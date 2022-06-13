import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const LevelButtonsWrapper = styled.div`
  .ant-radio-button-wrapper:hover {
    color: #fff;
  }
  ${props =>
    props.isButtons &&
    `label:hover {
    background-color: #ef3d46;
  }`}
  .ant-radio-button-wrapper.ant-radio-button-wrapper-checked,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background-color: #ef3d46;
    color: #fff;
    // border-color: #ef3d46;
    box-shadow: -1px 0 0 0 #ef3d46;
  }

  // .ant-radio-inner::after {
  //   background-color: #ef3d46;
  // }

  .ant-radio-inner,
  .ant-radio-checked .ant-radio-inner {
    // border-color: #ef3d46;
  }
`
