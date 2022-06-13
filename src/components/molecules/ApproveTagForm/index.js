import React from 'react'
import styled from 'styled-components'
import { Form, Select, Modal } from 'antd'
import intl from 'react-intl-universal'

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

const ApproveTagForm = (onSubmit, onChange) =>
  confirm({
    icon: null,
    okText: intl.get('reviews.actions.submit'),
    content: (
      <Wrapper>
        <Form.Item label={intl.get('reviews.tags.label')}>
          <Select
            style={{ width: '100%' }}
            onChange={onChange}
            placeholder={intl.get('reviews.tags.placeholder')}
            mode='tags'
          />
        </Form.Item>
      </Wrapper>
    ),
    okType: 'danger',
    cancelText: intl.get('cancel'),
    centered: true,
    onOk() {
      onSubmit()
    }
  })

export default ApproveTagForm
