import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col, InputNumber, Input, DatePicker, Table } from 'antd'
import * as ST from './styles'
import events from './consts'

const findEventIndex = id => {
  return events.findIndex(event => event.event === id)
}

const columns = update => {
  return [
    {
      key: 'event',
      dataIndex: 'event',
      align: 'center',
      title: 'ID'
    },
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: 'Engagement Name'
    },
    {
      key: 'description',
      dataIndex: 'description',
      align: 'center',
      title: 'Description'
    },
    {
      key: 'id',
      align: 'center',
      title: 'Cost',
      render: event => (
        <>
          <Form.Item hidden name={['events', findEventIndex(event.event), 'event']}>
            <Input disabled={update} />
          </Form.Item>
          <Form.Item name={['events', findEventIndex(event.event), 'value']}>
            {window.location.pathname.includes('tariff-create') ? (
              <InputNumber disabled={update} placeholder='0.00' min='0' />
            ) : (
              <InputNumber
                disabled={update}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder='0.00'
                min='0'
              />
            )}
          </Form.Item>
        </>
      )
    }
  ]
}

const TariffForm = ({ tariff, onFinish, id, update }) => {
  const mergedEvents = events.map(event => {
    const tariffEvent = tariff?.events?.find(e => e.event === event.event)
    if (tariffEvent) {
      return tariffEvent
    }
    return {
      event: event.event,
      value: undefined
    }
  })
  const initialValues = { ...tariff, events: mergedEvents, starts_at: moment(tariff?.starts_at) }
  const history = useHistory()
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  const handleCancel = () => {
    history.push(`/admin/customers/list/${id}`)
  }
  return (
    <ST.StepWrapper>
      <Form
        name='tariff-form'
        id='tariff-form'
        layout='vertical'
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <Col className='gutter-row' span={12}>
              <h3>{intl.get('tariff.formSetting')}</h3>
              <Form.Item
                label={intl.get('tariff.fields.start_date')}
                name='starts_at'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className='gutter-row' span={24}>
              <h3>{intl.get('tariff.formEngagement')}</h3>
              <Table
                pagination={false}
                dataSource={events.filter(event => event.event < 8)}
                columns={columns(update)}
                rowKey='event'
              />
            </Col>
            <Col className='gutter-row' span={24}>
              <h3>{intl.get('tariff.formCashback')}</h3>
              <Table
                pagination={false}
                dataSource={events.filter(event => event.event > 39)}
                columns={columns(update)}
                rowKey='event'
              />
            </Col>
          </Row>
        </ST.Section>
        <Row gutter={16} style={{ marginTop: '10px' }}>
          <Col className='gutter-row' span={12}>
            <Button type='primary' htmlType='submit'>
              {intl.get('tariff.actions.save')}
            </Button>
          </Col>
          <Col className='gutter-row' span={12} style={{ textAlign: 'right' }}>
            <Button type='primary' onClick={handleCancel}>
              {intl.get('tariff.actions.cancel')}
            </Button>
          </Col>
        </Row>
      </Form>
    </ST.StepWrapper>
  )
}
TariffForm.propTypes = {
  tariff: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  update: PropTypes.bool
}

TariffForm.defaultProps = {
  tariff: {},
  update: false
}
export default TariffForm
