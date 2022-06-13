import React from 'react'
import { Modal } from 'antd'
import intl from 'react-intl-universal'
import CommentForm from '../CommentForm'

const { confirm } = Modal

const ApproveCommentForm = (onSubmit, onChange, commentText) =>
  confirm({
    icon: null,
    okText: intl.get('reviews.actions.submit'),
    content: <CommentForm onChange={onChange} commentText={commentText} />,
    okType: 'danger',
    cancelText: intl.get('cancel'),
    centered: true,
    onOk(close) {
      const isSuccess = onSubmit()

      if (isSuccess) {
        close()
      }
    }
  })

export default ApproveCommentForm
