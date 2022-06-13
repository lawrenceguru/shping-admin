import React from 'react'
import { Form, Col, Select, Checkbox, Radio, Slider } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import useGenders from '../../../data/settings/genders'

const { Option } = Select

const PreAudient = ({ setAgeRange, ageRange, languages }) => {
  const { genders } = useGenders()
  const lang = window.localStorage.getItem('lang')
  const marks = {
    0: {
      label: <strong>0</strong>
    },
    8: '8',
    18: '18',
    26: '26',
    37: '37',
    60: '60',
    90: '90',
    120: {
      label: <strong>∞</strong>
    }
  }

  const handleAgeChange = values => {
    setAgeRange(values)
  }
  return (
    <>
      <Col className='gutter-row' span={24}>
        <h4 className='geoTopic'>{intl.get('todo.deliveries.form.audienceTitle')}</h4>
        <Form.Item
          name={['audience', 'gender']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          <Radio.Group>
            <Radio.Button value='any'>All</Radio.Button>
            {Array.isArray(genders) &&
              genders.map(gender => (
                <Radio.Button value={gender.type} key={gender.type}>
                  {lang === 'en' && gender.name}
                  {lang === 'ru' && gender.name_ru}
                  {lang === 'zh' && gender.name_zh}
                </Radio.Button>
              ))}
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col className='gutter-row mb-10' span={24}>
        <Slider range marks={marks} max={120} defaultValue={ageRange} onChange={handleAgeChange} />
      </Col>
      <Col className='gutter-row' span={24}>
        <Form.Item
          name={['audience', 'languages']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
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
        <Form.Item
          label={intl.get('campaigns.rewards.form.levelTitle')}
          name={['audience', 'user_levels']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          <Checkbox.Group>
            <Checkbox value='basic'>{intl.get('campaigns.rewards.form.levels.basic')}</Checkbox>
            <Checkbox value='bronze'>{intl.get('campaigns.rewards.form.levels.bronze')}</Checkbox>
            <Checkbox value='silver'>{intl.get('campaigns.shoppingListAds.userLevels.silver')}</Checkbox>
            <Checkbox value='gold'>{intl.get('campaigns.rewards.form.levels.gold')}</Checkbox>
            <Checkbox value='platinum'>{intl.get('campaigns.rewards.form.levels.platinum')}</Checkbox>
            <Checkbox value='ambassador'>{intl.get('campaigns.rewards.form.levels.ambasad')}</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Col>
    </>
  )
}

PreAudient.propTypes = {
  ageRange: PropTypes.shape({}),
  setAgeRange: PropTypes.func.isRequired,
  languages: PropTypes.shape({})
}

PreAudient.defaultProps = {
  ageRange: {},
  languages: {}
}

export default PreAudient
