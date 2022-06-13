import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Modal, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { useSWRConfig } from 'swr'
import { reject } from './actions'

const RejectModal = ({ visible, closeModal, dataId, isList, cashback }) => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [reason, setReason] = useState()
  const { mutate } = useSWRConfig()

  const handleOk = () => {
    setConfirmLoading(true)
    reject(
      { id: dataId, status: 'failure', reason },
      ticket,
      isList,
      cashback,
      mutate,
      () => {
        closeModal()
        setConfirmLoading(false)
      },
      () => {
        setConfirmLoading(false)
      }
    )
  }

  const handleCancel = () => {
    closeModal()
  }
  const handleChange = v => {
    setReason(v.target.value)
  }

  return (
    <Modal title='Reject' visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <Form preserve={false}>
        <Form.Item
          label={intl.get('campaigns.cashbacks.submissions.tableHeader.reason')}
          name='reason'
          rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
        >
          <Input reason={reason} onChange={handleChange} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

RejectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dataId: PropTypes.string.isRequired,
  isList: PropTypes.bool,
  cashback: PropTypes.arrayOf(PropTypes.any)
}
RejectModal.defaultProps = {
  isList: false,
  cashback: []
}

export default RejectModal
