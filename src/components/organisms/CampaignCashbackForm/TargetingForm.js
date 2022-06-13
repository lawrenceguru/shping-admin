import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, Checkbox, Slider, Divider } from 'antd'
import intl from 'react-intl-universal'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetCountries, settingsGetLanguages } from 'store/actions'
import * as ST from './styles'
import useRetailers from '../../../data/settings/retailers'
import Tags from '../../molecules/Tags/form'
import PublishConfirmDialog from './PublishConfirmDialog'
import useDisableButton from '../../../hooks/useDisableButton'
/* eslint-disable react/no-array-index-key */
const { Option } = Select
const countryFilterOption = (input, option) => option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
const AudienceForm = ({ initialValues, prev, onFinish, onPublished }) => {
  const { retailers } = useRetailers()
  const countries = useSelector(({ settings }) => settings.countries)
  const languages = useSelector(({ settings }) => settings.languages)
  const dispatch = useDispatch()
  useEffect(() => {
    if (countries.length === 0) dispatch(settingsGetCountries())
  }, [countries])
  useEffect(() => {
    if (languages.length === 0) dispatch(settingsGetLanguages())
  }, [languages])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm()

  const lang = window.localStorage.getItem('lang')
  const marks = {
    0: '0',
    18: '18',
    26: '26',
    37: '37',
    60: '60',
    80: {
      style: {
        color: '#f50'
      },
      label: <strong>80</strong>
    }
  }
  const [ageRange, setAgeRange] = useState([initialValues.audience.min_age, initialValues.audience.max_age])
  const handleAgeChange = values => {
    setAgeRange(values)
  }
  const [disabledSave, setDisabledSave] = useDisableButton(false)
  const handleSubmit = values => {
    setDisabledSave(true)
    const cloneValues = values
    const [min, max] = ageRange
    cloneValues.audience.min_age = min
    cloneValues.audience.max_age = max
    onFinish(cloneValues)
  }
  const getFormValues = () => {
    const values = form.getFieldsValue()
    const [min, max] = ageRange
    values.audience.min_age = min
    values.audience.max_age = max
    return values
  }
  const handlePrev = () => {
    prev(getFormValues())
  }
  const [publishFormVisible, setPublishFormVisible] = useState(false)
  const handlePublish = () => {
    setPublishFormVisible(true)
  }
  const publishedSubmit = () => {
    onPublished(getFormValues())
  }
  return (
    <>
      <Form
        name='audience-form'
        id='audience-form'
        layout='vertical'
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <Col className='gutter-row' span={12}>
              <Row gutter={16}>
                <Col className='gutter-row' span={24}>
                  <Form.Item
                    name={['audience', 'countries']}
                    label={intl.get('campaigns.cashbacks.fields.countries')}
                    rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                  >
                    <Select
                      showSearch
                      mode='multiple'
                      placeholder={intl.get('campaigns.cashbacks.fields.country')}
                      filterOption={countryFilterOption}
                    >
                      {Array.isArray(countries) &&
                        countries.map(country => (
                          <Option key={country.iso} value={country.iso}>
                            {lang === 'en' && country.name}
                            {lang === 'ru' && country.name_ru}
                            {lang === 'zh' && country.name_zh}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item label={intl.get('campaigns.cashbacks.fields.languages')} name={['audience', 'languages']}>
                    <Select mode='multiple'>
                      {languages.map(language => (
                        <Option value={language.code} key={language.code}>
                          {lang === 'en' && language.name}
                          {lang === 'ru' && language.name_ru}
                          {lang === 'zh' && language.name_zh}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item label={intl.get('campaigns.cashbacks.fields.postcodes')} name={['audience', 'postcode']}>
                    <Tags />
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item
                    label={intl.get('campaigns.cashbacks.fields.cities')}
                    name={['audience', 'city']}
                    // rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                  >
                    <Tags />
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item
                    label={intl.get('campaigns.cashbacks.fields.receiptPostcodes')}
                    name={['options', 'receipt_postcode']}
                    // rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                  >
                    <Tags />
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item
                    label={intl.get('campaigns.cashbacks.fields.retailers')}
                    name={['options', 'retailers']}
                    // rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                  >
                    <Select mode='multiple'>
                      {Array.isArray(retailers) &&
                        retailers.map(retailer => (
                          <Option key={retailer.id} value={retailer.id}>
                            {retailer.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className='gutter-row' span={12}>
              <Row gutter={16}>
                <Col className='gutter-row' span={12}>
                  <div>{intl.get('campaigns.cashbacks.fields.ageRange')}</div>
                  <Slider range marks={marks} max={80} defaultValue={ageRange} onChange={handleAgeChange} />
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item label={intl.get('campaigns.cashbacks.fields.levels')} name={['audience', 'user_levels']}>
                    <Select mode='multiple'>
                      <Option value='basic'>{intl.get('campaigns.shoppingListAds.userLevels.basic')}</Option>
                      <Option value='bronze'>{intl.get('campaigns.shoppingListAds.userLevels.bronze')}</Option>
                      <Option value='silver'>{intl.get('campaigns.shoppingListAds.userLevels.silver')}</Option>
                      <Option value='gold'>{intl.get('campaigns.shoppingListAds.userLevels.gold')}</Option>
                      <Option value='platinum'>{intl.get('campaigns.shoppingListAds.userLevels.platinum')}</Option>
                      <Option value='ambassador'>{intl.get('campaigns.shoppingListAds.userLevels.ambassador')}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className='gutter-row' span={24}>
                  <Form.Item label={intl.get('campaigns.cashbacks.fields.gender')} name={['audience', 'gender']}>
                    <Checkbox.Group>
                      <Checkbox value='all'>{intl.get('campaigns.cashbacks.gender.all')}</Checkbox>
                      <Checkbox value='male'>{intl.get('campaigns.cashbacks.gender.male')}</Checkbox>
                      <Checkbox value='female'>{intl.get('campaigns.cashbacks.gender.female')}</Checkbox>
                      <Checkbox value='other'>{intl.get('campaigns.cashbacks.gender.other')}</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Button type='primary' onClick={handlePrev}>
              {intl.get('campaigns.cashbacks.actions.previous')}
            </Button>
          </Col>
          <Col className='gutter-row' span={12} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' disabled={disabledSave}>
              {intl.get('campaigns.cashbacks.actions.save')}
            </Button>
            <Divider type='vertical' />
            <Button type='primary' danger onClick={handlePublish}>
              {intl.get('campaigns.cashbacks.actions.publish')}
            </Button>
          </Col>
        </Row>
      </Form>
      <PublishConfirmDialog
        visible={publishFormVisible}
        setVisible={setPublishFormVisible}
        published={publishedSubmit}
      />
    </>
  )
}

AudienceForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
}

export default AudienceForm
