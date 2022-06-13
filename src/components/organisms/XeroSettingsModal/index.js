import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Modal, Form, Input, InputNumber, Row, Col, Radio, Checkbox, Select, Button } from 'antd'
import { useSelector } from 'react-redux'
import { useSWRConfig } from 'swr'
import styled from 'styled-components'
import { save, disconnect } from './actions'

const { Option } = Select

const currentLocale = localStorage.getItem('lang')
export const ModalWrapper = styled(Modal)`
  & .ant-btn {
    height: 40px;
    width: 130px;
  }
  & .ant-btn-primary {
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`

const XeroSettingsModal = ({ visible, closeModal, participantId, xero }) => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const [form] = Form.useForm()
  const handleOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then(values => {
        const postData = { ...values, participant_id: participantId }
        save(
          postData,
          ticket,
          xero?.billings?.xero_contact_id,
          mutate,
          () => {
            closeModal()
            setConfirmLoading(false)
          },
          () => {
            setConfirmLoading(false)
          }
        )
      })
      .catch(err => {
        console.log(err)
        setConfirmLoading(false)
      })
  }
  useEffect(() => {
    return () => setConfirmLoading(false)
  }, [])
  const handleCancel = () => {
    closeModal()
  }
  const handleDisconnect = () => {
    setConfirmLoading(true)
    disconnect(participantId, ticket, mutate, () => {
      closeModal()
      setConfirmLoading(false)
    })
  }
  const countries = useSelector(({ settings }) => settings.countries)
  const initialValues = {
    attention_name: xero?.contact?.name,
    email: xero?.contact?.emailAddress,
    attention_to: xero?.contact?.addresses[0]?.attentionTo,
    address_1: xero?.contact?.addresses[0]?.addressLine1,
    state: xero?.contact?.addresses[0]?.region,
    postcode: xero?.contact?.addresses[0]?.postalCode,
    country_code: xero?.contact?.addresses[0]?.country,
    address_2: xero?.contact?.addresses[0]?.addressLine2,
    frequency: xero?.billings?.frequency,
    due_date: xero?.billings?.due_date || 7,
    invoice_time: xero?.billings?.invoice_time,
    has_budget_adjustment: xero?.billings?.has_budget_adjustment,
    has_brand_segmentation: xero?.billings?.has_brand_segmentation
  }
  return (
    <ModalWrapper
      title={intl.get('campaigns.cashbacks.submissions.acceptModalTitle')}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key='back' onClick={handleCancel}>
          {intl.get('common.cancel')}
        </Button>,
        <Button key='submit' type='primary' loading={confirmLoading} onClick={handleOk}>
          {xero?.billings?.xero_contact_id ? intl.get('customer.xero.update') : intl.get('customer.xero.connect')}
        </Button>,
        xero?.billings?.xero_contact_id && (
          <Button key='disconnect' type='primary' loading={confirmLoading} onClick={handleDisconnect}>
            {intl.get('customer.xero.disconnect')}
          </Button>
        )
      ]}
    >
      <Form form={form} preserve={false} initialValues={initialValues} layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <h3>{intl.get('customer.xero.billingSubheader')}</h3>
            <Form.Item
              label={intl.get('customer.xero.attention')}
              name='attention_name'
              rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.contactName')} name='attention_to'>
              <Input />
            </Form.Item>
            <Form.Item
              label={intl.get('customer.xero.email')}
              name='email'
              rules={[{ type: 'email', message: intl.get('validation.email') }]}
            >
              <Input type='email' />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.address1')} name='address_1'>
              <Input />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.address2')} name='address_2'>
              <Input />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.state')} name='state'>
              <Input />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.postcode')} name='postcode'>
              <Input />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.country')} name='country_code'>
              <Select
                showSearch
                style={{ width: '100%' }}
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                getPopupContainer={trigger => trigger.parentNode}
                placeholder={intl.get('widgets.madeIn.placeholder')}
              >
                {countries.map(el => (
                  <Option style={{ fontSize: 16 }} key={el.iso} value={el.iso}>
                    {currentLocale !== 'en' ? el[`name_${currentLocale}`] : el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>{intl.get('customer.xero.invoiceSubheader')}</h3>
            <Form.Item label={intl.get('customer.xero.frequency')} name='frequency'>
              <Radio.Group>
                <Radio value='WEEKLY'>{intl.get('customer.xero.frequencyWeek')}</Radio>
                <Radio value='MONTHLY'>{intl.get('customer.xero.frequencyMonth')}</Radio>
                <Radio value='ANNUALLY'>{intl.get('customer.xero.frequencyYear')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.dueDate')} name='due_date'>
              <InputNumber min={0} step={1} defaultValue={0} />
            </Form.Item>
            <Form.Item label={intl.get('customer.xero.invoiceTime')} name='invoice_time'>
              <Input type='time' />
            </Form.Item>
            <Form.Item
              label={intl.get('customer.xero.adjustment')}
              name='has_budget_adjustment'
              valuePropName='checked'
              help={intl.get('customer.xero.adjustmentHelp')}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label={intl.get('customer.xero.segmentation')}
              name='has_brand_segmentation'
              valuePropName='checked'
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWrapper>
  )
}

XeroSettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  participantId: PropTypes.string.isRequired,
  xero: PropTypes.shape({})
}
XeroSettingsModal.defaultProps = {
  xero: {}
}

export default XeroSettingsModal
