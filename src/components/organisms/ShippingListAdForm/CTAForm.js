import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, AutoComplete, InputNumber } from 'antd'
import intl from 'react-intl-universal'
import { useSelector } from 'react-redux'
import * as ST from './styles'
import useGtins from '../../../data/pam/gtins'

const { Option } = Select
const { Option: AutoOption } = AutoComplete

const SettingsForm = ({ initialValues, prev, onFinish }) => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  const handlePrev = () => {
    prev(form.getFieldsValue())
  }
  const currentParticipant = useSelector(({ identity }) => identity.current_participant)
  const isSystemAdmin = useMemo(() => {
    return currentParticipant === 'urn:authenticateit:participant:1'
  }, [currentParticipant])
  const [searchGtn, setSearchGtn] = useState('')
  const [isAuto, setIsAuto] = useState(false)
  const { gtins } = useGtins(searchGtn)
  const handleOnKeyDown = useCallback(
    event => {
      if (
        event.keyCode === 8 &&
        searchGtn &&
        (searchGtn.length === 1 || searchGtn === window.getSelection().toString())
      ) {
        setSearchGtn('')
      }
    },
    [searchGtn]
  )

  const handleOnChange = () => {
    setSearchGtn()
  }

  const handleOnSearch = searchString => {
    if (searchString) {
      setIsAuto(false)
      setSearchGtn(searchString)
    }
  }
  const handleAutoSearch = value => {
    setIsAuto(true)
    setSearchGtn(value)
  }
  const [infoType, setInfoType] = useState(initialValues.info_type)
  return (
    <Form
      name='cta-form'
      id='cta-form'
      layout='vertical'
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.info_type')}
              name='info_type'
              rules={[
                {
                  required: ['top_category_ad', 'top_keyword_ad', 'main_page_ad'].includes(initialValues.ad_type),
                  message: intl.get('campaigns.shoppingListAds.requiredMessage')
                }
              ]}
            >
              <Select mode='multiple' onChange={value => setInfoType(value)}>
                <Option value='learn_more'>{intl.get('campaigns.shoppingListAds.info_type.learn_more')}</Option>
                <Option value='add2list'>{intl.get('campaigns.shoppingListAds.info_type.add2list')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.target_gtin')}
              name='target_gtin'
              hidden={infoType.length === 0}
              rules={[
                {
                  required: infoType.length > 0,
                  message: intl.get('campaigns.shoppingListAds.requiredMessage')
                }
              ]}
            >
              <AutoComplete onSearch={handleAutoSearch} onSelect={handleOnChange}>
                {isAuto &&
                  Array.isArray(gtins) &&
                  gtins.map(gtin => (
                    <AutoOption key={gtin.id} value={gtin.id}>
                      {gtin.id}
                    </AutoOption>
                  ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.full_range_gtins')}
              name='full_range_gtins'
              rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
            >
              <Select
                showSearch
                mode='multiple'
                placeholder={intl.get('campaigns.shoppingListAds.fields.gtin')}
                searchValue={searchGtn}
                onKeyDown={handleOnKeyDown}
                onSearch={handleOnSearch}
              >
                {!isAuto &&
                  Array.isArray(gtins) &&
                  gtins.map(gtin => (
                    <Option key={gtin.id} value={gtin.id}>
                      {gtin.id}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.weight')}
              name='weight'
              hidden={!isSystemAdmin}
              rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </ST.Section>
      <Row gutter={16}>
        <Col className='gutter-row' span={12}>
          <Button type='primary' onClick={handlePrev}>
            {intl.get('campaigns.shoppingListAds.actions.previous')}
          </Button>
        </Col>
        <Col className='gutter-row' span={12}>
          <Button type='primary' htmlType='submit'>
            {intl.get('campaigns.shoppingListAds.actions.save')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

SettingsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  prev: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
}

export default SettingsForm
