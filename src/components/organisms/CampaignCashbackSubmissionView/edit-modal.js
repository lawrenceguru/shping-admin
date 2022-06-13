import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Modal, Form, InputNumber } from 'antd'
import { useSelector } from 'react-redux'
import { useSWRConfig } from 'swr'
import { save } from './actions'

const EditModal = ({ visible, closeModal, dataId, amount }) => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [value, setValue] = useState(amount)
  const { mutate } = useSWRConfig()
  const handleOk = () => {
    setConfirmLoading(true)
    save({ id: dataId, cashback_value: value }, ticket, mutate, () => {
      closeModal()
      setConfirmLoading(false)
    })
  }

  const handleCancel = () => {
    closeModal()
  }
  const handleChange = v => {
    setValue(v)
  }

  return (
    <Modal
      title={intl.get('campaigns.cashbacks.submissions.acceptModalTitle')}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form preserve={false} initialValues={{ cashback_value: amount }}>
        <Form.Item
          label={intl.get('campaigns.cashbacks.submissions.tableHeader.cashbackAmount')}
          name='cashback_value'
          rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
        >
          <InputNumber value={value} onChange={handleChange} min={0.01} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

EditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dataId: PropTypes.string.isRequired,
  amount: PropTypes.number
}
EditModal.defaultProps = {
  amount: 1
}

export default EditModal
