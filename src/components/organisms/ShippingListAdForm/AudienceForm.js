import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Row, Col, Select, Checkbox, Slider } from 'antd'
import intl from 'react-intl-universal'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetCountries, settingsGetLanguages } from 'store/actions'
import * as ST from './styles'
import deleteModal from '../../molecules/DeleteModal'
/* eslint-disable react/no-array-index-key */
const { Option } = Select
const countryFilterOption = (input, option) => option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
const AudienceForm = ({ initialValues, next, prev }) => {
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
  const [ageRange, setAgeRange] = useState([initialValues.min_age, initialValues.max_age])
  const handleAgeChange = values => {
    setAgeRange(values)
  }
  const [update, setUpdate] = useState(false)
  const [locations, setLocations] = useState(initialValues.location)
  const [location, setLocation] = useState({})
  const [locationIndex, setLocationIndex] = useState()
  const onFinish = values => {
    const cloneValues = values
    cloneValues.location = locations
    const [min, max] = ageRange
    cloneValues.min_age = min
    cloneValues.max_age = max
    next(cloneValues)
  }
  const handlePrev = () => {
    const values = form.getFieldsValue()
    values.location = locations
    const [min, max] = ageRange
    values.min_age = min
    values.max_age = max
    prev(values)
  }

  const handleAddLocation = () => {
    setUpdate(true)
    setLocation({})
    setLocationIndex()
  }
  const handleUpdateLocation = (item, index) => () => {
    setUpdate(true)
    setLocation(item)
    setLocationIndex(index)
  }
  const handleDeleteLocation = index => {
    const clonedLocations = [...locations]
    if (index > -1) {
      clonedLocations.splice(index, 1)
      setLocations(clonedLocations)
    }
  }
  const showConfirm = index => () => {
    deleteModal(() => handleDeleteLocation(index), intl.get('campaigns.shoppingListAds.deleteLocationConfirm'))
  }
  const handleChangeInputLocation = name => event => {
    setLocation({ ...location, [name]: event.target.value })
  }
  const handleChangeLocation = name => value => {
    setLocation({ ...location, [name]: value })
  }
  const handleSaveLocation = () => {
    if (locationIndex === undefined) {
      setLocations([...locations, location])
    } else {
      const updatedLocations = locations.map((item, index) => {
        if (locationIndex === index) return location
        return item
      })
      setLocations(updatedLocations)
    }
    setUpdate(false)
    setLocationIndex()
  }
  const handleCancelLocation = () => {
    setUpdate(false)
  }
  useEffect(() => {
    setLocations(form.getFieldValue('location'))
  }, [form.getFieldValue('location')])
  const displayCountry = name => {
    const countryItem = countries.find(country => country.alpha2 === name)
    if (countryItem) {
      if (lang === 'en') return countryItem.name
      if (lang === 'ru') return countryItem.name_ru
      if (lang === 'zh') return countryItem.name_zh
    }
    return ''
  }
  return (
    <Form
      name='audience-form'
      id='audience-form'
      layout='vertical'
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Row gutter={16}>
              <Col className='gutter-row' span={24}>
                <Form.Item
                  label={intl.get('campaigns.shoppingListAds.fields.gender')}
                  name='gender'
                  rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
                >
                  <Checkbox.Group>
                    <Checkbox value='all'>{intl.get('campaigns.shoppingListAds.gender.all')}</Checkbox>
                    <Checkbox value='male'>{intl.get('campaigns.shoppingListAds.gender.male')}</Checkbox>
                    <Checkbox value='female'>{intl.get('campaigns.shoppingListAds.gender.female')}</Checkbox>
                    <Checkbox value='other'>{intl.get('campaigns.shoppingListAds.gender.other')}</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col className='gutter-row' span={24}>
                <Form.Item label={intl.get('campaigns.shoppingListAds.fields.levels')} name='user_levels'>
                  <Select mode='multiple'>
                    <Option value='basic'>{intl.get('campaigns.shoppingListAds.userLevels.basic')}</Option>
                    <Option value='bronze'>{intl.get('campaigns.shoppingListAds.userLevels.bronze')}</Option>
                    <Option value='silver'>{intl.get('campaigns.shoppingListAds.userLevels.silver')}</Option>
                    <Option value='gold'>{intl.get('campaigns.shoppingListAds.userLevels.gold')}</Option>
                    <Option value='platinum'>{intl.get('campaigns.shoppingListAds.userLevels.platinum')}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className='gutter-row' span={24}>
                <Form.Item label={intl.get('campaigns.shoppingListAds.fields.languages')} name='language'>
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
              <Col className='gutter-row' span={12}>
                <div>{intl.get('campaigns.shoppingListAds.fields.ageRange')}</div>
                <Slider range marks={marks} max={80} defaultValue={ageRange} onChange={handleAgeChange} />
              </Col>
            </Row>
          </Col>
          <Col className='gutter-row' span={12}>
            <Row gutter={16}>
              {update ? (
                <>
                  <Col className='gutter-row' span={24}>
                    <Form.Item label={intl.get('campaigns.shoppingListAds.fields.country')}>
                      <Select
                        showSearch
                        value={location.country}
                        placeholder={intl.get('campaigns.shoppingListAds.fields.country')}
                        filterOption={countryFilterOption}
                        onChange={handleChangeLocation('country')}
                      >
                        {Array.isArray(countries) &&
                          countries.map(country => (
                            <Option key={country.alpha2} value={country.alpha2}>
                              {lang === 'en' && country.name}
                              {lang === 'ru' && country.name_ru}
                              {lang === 'zh' && country.name_zh}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col className='gutter-row' span={24}>
                    <Form.Item
                      label={intl.get('campaigns.shoppingListAds.fields.state')}
                      rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
                    >
                      <Input value={location.state} onChange={handleChangeInputLocation('state')} />
                    </Form.Item>
                  </Col>
                  <Col className='gutter-row' span={24}>
                    <Form.Item
                      label={intl.get('campaigns.shoppingListAds.fields.postcode')}
                      rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
                    >
                      <Input value={location.postcode} onChange={handleChangeInputLocation('postcode')} />
                    </Form.Item>
                  </Col>
                  <Col className='gutter-row' span={24}>
                    <Button size='small' onClick={handleSaveLocation}>
                      {intl.get('campaigns.shoppingListAds.buttonLocationSave')}
                    </Button>
                    <Button size='small' onClick={handleCancelLocation}>
                      {intl.get('campaigns.shoppingListAds.buttonLocationCancel')}
                    </Button>
                  </Col>
                </>
              ) : (
                <Col span={24}>
                  <Row gutter={16}>
                    <Col span={18}>
                      <div>{intl.get('campaigns.shoppingListAds.fields.locations')}&nbsp;&nbsp;&nbsp;</div>
                    </Col>
                    <Col span={6}>
                      <Button type='danger' size='small' onClick={handleAddLocation}>
                        {intl.get('campaigns.shoppingListAds.buttonLocationCreate')}
                      </Button>
                    </Col>
                  </Row>
                  {locations.map((item, index) => (
                    <Row gutter={16} style={{ marginTop: '10px' }} key={index}>
                      <Col span={6}>{displayCountry(item.country)}</Col>
                      <Col span={6}>{item.state}</Col>
                      <Col span={6}>{item.postcode}</Col>
                      <Col span={6}>
                        <Button size='small' onClick={handleUpdateLocation(item, index)}>
                          {intl.get('campaigns.shoppingListAds.buttonLocationUpdate')}
                        </Button>
                        <Button size='small' onClick={showConfirm(index)}>
                          {intl.get('campaigns.shoppingListAds.buttonLocationDelete')}
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </Col>
              )}
            </Row>
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
            {intl.get('campaigns.shoppingListAds.actions.next')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

AudienceForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
}

export default AudienceForm
