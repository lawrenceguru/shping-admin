import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  place-content: stretch;
  background-color: #f4f4f4;
  height: 100vh;
  overflow-x: hidden;
  & input[type='number']::-webkit-inner-spin-button,
  & input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & input[type='number'] {
    -moz-appearance: textfield;
  }
  & .anticon-loading {
    color: #ef3d46;
  }
  & .ant-select-selection--multiple .ant-select-selection__choice {
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }

  & .ant-select-selection--multiple .ant-select-selection__choice .ant-select-selection__choice__content,
  & .ant-select-selection--multiple .ant-select-selection__choice__remove svg {
    color: white !important;
  }
  // & .ant-switch-checked {
  //   background-color: #ef3d46;
  // }
  & .ant-checkbox + span {
    color: rgb(178, 179, 178);
  }
  & .EditorToolbar__root___3_Aqz {
    padding: 5px 0 0;
    margin: 0;
  }
  & .ant-form-item-children {
    position: static;
  }
  & .ant-checkbox-checked::after,
  & span::selection {
    border: 1px solid #ef3d46;
  }
  & .fa.disabled,
  .fa-plus.disabled,
  .fa-times.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  & .ant-select-disabled .ant-select-selection--multiple .ant-select-selection__choice {
    background-color: #e6a2a5;
    border-color: #e6a2a5;
  }
  & .disabled.rdw-editor-main {
    overflow: hidden !important;
  }
  & .ant-select-dropdown-menu-item {
    white-space: normal;
  }
  & textarea {
    resize: none;
  }
  & .has-error.has-feedback .ant-form-item-children-icon {
    margin-top: -18px;
  }
  & .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background-color: rgb(239, 239, 239);
  }
  .ant-pagination-item-active a {
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-pagination-item a {
    color: #b3b3b3;
  }
  .ant-pagination-item-active:focus,
  .ant-pagination-item-active:hover,
  .ant-pagination-item-active:focus a,
  .ant-pagination-item-active:hover a,
  .ant-pagination-item-active {
    border-color: #aaa;
    color: #aaa;
  }
`
