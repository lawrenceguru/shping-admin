import React, { useCallback, useEffect, useState } from 'react'
import { Form, Row, Col, DatePicker, Input, Button, Select } from 'antd'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import * as ST from './styles'
import getGtin from '../../../data/cashout/getGtin'
import getProduct from '../../../data/cashout/getProduct'

const { RangePicker } = DatePicker

const { Option } = Select
const Settings = ({ next, initialValues, leftSideData }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [gtins, setGtins] = useState([])
  const clonedInitialValues = { ...initialValues }
  if (clonedInitialValues?.start_date && clonedInitialValues?.end_date) {
    clonedInitialValues.date = [moment(clonedInitialValues?.start_date), moment(clonedInitialValues?.end_date)]
  }
  useEffect(async () => {
    const data = await getProduct(initialValues?.product)
    leftSideData('product_name', data[0]?.name)
    leftSideData('image', data[0]?.image)
  }, [initialValues])
  useEffect(() => {
    setStartDate(clonedInitialValues.start_date)
    setEndDate(clonedInitialValues.end_date)
    console.log(startDate, endDate)
  }, [clonedInitialValues])
  // console.log(clonedInitialValues)
  const history = useHistory()
  const [form] = Form.useForm()
  const disabledDate = useCallback(
    current => {
      return current && current < moment().endOf('day')
    },
    [moment]
  )
  const handleCancel = () => {
    history.goBack()
  }
  const onChangeGTIN = async e => {
    const data = await getProduct(e.split(', ')[0])
    leftSideData('product', e.split(', ')[0])
    leftSideData('product_name', data[0]?.name)
    leftSideData('image', data[0]?.image)
  }
  const onSearchGTIN = async e => {
    const result = await getGtin(e)
    setGtins(result)
  }
  return (
    <ST.SettingForm>
      <Form
        name='campaignData'
        form={form}
        onFinish={next}
        layout='vertical'
        initialValues={clonedInitialValues}
        // test
      >
        <Row gutter={[16, 16]} justify='start' align='bottom'>
          <Col className='gutter-row' span={18}>
            <Form.Item
              name='product'
              label='Product GTIN'
              rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              {/* <Input
                placeholder='Please enter GTIN or product name'
                onChange={e => leftSideData('product', e.target.value)}
              /> */}
              <Select
                // mode='multiple'
                showSearch
                getPopupContainer={trigger => trigger.parentNode}
                onChange={() => onChangeGTIN(form.getFieldValue(`product`))}
                placeholder='Please enter GTIN or product name'
                onSearch={e => onSearchGTIN(e)}
              >
                {gtins?.map(gtin => {
                  const txt = ', '
                  const temp = gtin.id + txt + gtin.name
                  return (
                    <Option key={gtin.id} value={temp}>
                      {gtin.id}, {gtin.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={6}>
            <Form.Item
              name='percents'
              label='Boost Value'
              rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              <Input addonAfter='%' placeholder='20' onChange={e => leftSideData('percents', e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify='start' align='bottom'>
          <Col className='gutter-row' span={24}>
            <Form.Item
              name='name'
              label='Campaign Name'
              rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              <Input placeholder='Enter cashback campaign name' onChange={e => leftSideData('name', e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify='start' align='bottom'>
          <Col className='gutter-row' span={24}>
            <Form.Item
              name='date'
              label='Campaign Duration'
              rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              <RangePicker
                // defaultValue={[startDate && moment(startDate, 'YYYY/MM/DD'),
                // endDate && moment(endDate, 'YYYY/MM/DD')]}
                disabledDate={disabledDate}
                onChange={e => leftSideData('date', e)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={24} style={{ textAlign: 'right', marginTop: '30px' }}>
            <Button className='cancelButton' size='large' onClick={handleCancel}>
              {intl.get('common.cancel')}
            </Button>
            <Button type='primary' htmlType='submit'>
              {intl.get('campaigns.cashbacks.actions.next')}
            </Button>
          </Col>
        </Row>
      </Form>
    </ST.SettingForm>
  )
}

export default Settings
