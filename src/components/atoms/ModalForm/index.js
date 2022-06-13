import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Modal } from 'antd'
import intl from 'react-intl-universal'

import { store } from '../../../index'

const { confirm } = Modal

const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  & .ant-form-item-label > label {
    color: rgba(0, 0, 0, 0.85);
  }
  & .ant-select {
    & .ant-select-selection-selected-value {
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
    }
  }
`

const ModalForm = (onSubmit, content, width, okText) =>
  confirm({
    icon: null,
    okText: okText || intl.get('reviews.actions.submit'),
    content: (
      <Provider store={store}>
        <Wrapper>{content}</Wrapper>
      </Provider>
    ),
    okType: 'danger',
    cancelText: intl.get('cancel'),
    width,
    centered: true,
    onOk(close) {
      const success = onSubmit()

      if (success) {
        close()
      }
    }
  })

export default ModalForm
