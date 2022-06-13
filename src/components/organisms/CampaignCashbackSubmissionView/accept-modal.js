import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Modal, Form, InputNumber } from 'antd'
import { useSelector } from 'react-redux'
import { useSWRConfig } from 'swr'
import { accept } from './actions'

const AcceptModal = ({ visible, closeModal, data, isList, cashback }) => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [value, setValue] = useState(data.cashback_value)
  const { mutate } = useSWRConfig()
  const handleOk = () => {
    setConfirmLoading(true)
    accept({ ...data, cashback_value: value }, ticket, isList, cashback, mutate, () => {
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
      <Form preserve={false} initialValues={{ cashback_value: data.cashback_value }}>
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

AcceptModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isList: PropTypes.bool,
  cashback: PropTypes.arrayOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}
AcceptModal.defaultProps = {
  data: {},
  isList: false,
  cashback: []
}

export default AcceptModal
