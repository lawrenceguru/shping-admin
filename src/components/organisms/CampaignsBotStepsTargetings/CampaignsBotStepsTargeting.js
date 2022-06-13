import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Form, Row, Col, Select, Checkbox, DatePicker } from 'antd'
import intl from 'react-intl-universal'
import { TYPE_REGISTRATION } from '../../pages/TodoDeliveryEditor/consts'
import useCountries from '../../../data/settings/agt/countries'
import PreAudient from '../../molecules/Location/PreAudient'
import GeoFormList from '../../molecules/Location/GeoFormList'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import * as ST from '../../molecules/Location/styles'
import '../../molecules/Location/styles.css'

const { Option } = Select
const CampaignsBotStepsTargeting = ({ values: initialValues, form, setAntdData, setAntdComplete }) => {
  const { result: countries } = useCountries()
  const languages = useSelector(({ settings }) => settings.languages)
  const dispatch = useDispatch()
  useEffect(() => {
    if (languages.length === 0) dispatch(settingsGetLanguages())
  }, [languages])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const [ageRange, setAgeRange] = useState([
    initialValues.audience !== undefined ? initialValues.audience.min_age : 0,
    initialValues.audience !== undefined ? initialValues.audience.max_age : 0
  ])
  const [scanDate, setScanDate] = useState(
    initialValues.audience !== undefined ? initialValues.audience.last_scan_date : ''
  )
  const onFinish = values => {
    const cloneValues = values
    const [min, max] = ageRange
    cloneValues.audience.min_age = min
    cloneValues.audience.max_age = max
    cloneValues.audience.last_scan_date = scanDate
    setAntdData(cloneValues)
    setAntdComplete(true)
  }
  const disabledDate = useCallback(
    current => {
      return current && current < moment().endOf('day')
    },
    [moment]
  )

  return (
    <ST.FormWrapper>
      <Form
        name='geo-target-form'
        id='geo-target-form'
        layout='vertical'
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <PreAudient setAgeRange={setAgeRange} ageRange={ageRange} languages={languages} />
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16} justify='space-around' align='bottom'>
                <Col span={12}>
                  <Row gutter={16} className='marginTop-20'>
                    <Col span={12} align='end'>
                      {intl.get('campaigns.bot.form.lastScanDateTitle')}
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <DatePicker
                          value={scanDate && moment(scanDate, 'YYYY/MM/DD')}
                          onChange={value => setScanDate(value && value.format('YYYY-MM-DD'))}
                          disabledDate={disabledDate}
                          className='lastScanDate'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <div>{intl.get('todo.deliveries.form.weeklyScansTitle')}</div>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item name={['audience', 'weekly_scans', 'from']}>
                        <CustomInputNumber placeholder={intl.get('todo.deliveries.form.weeklyScansFromPlaceholder')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name={['audience', 'weekly_scans', 'to']}>
                        <CustomInputNumber placeholder={intl.get('todo.deliveries.form.weeklyScansToPlaceholder')} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['audience', 'scan_countries']}
                label={intl.get('todo.deliveries.form.scannedCountriesTitle')}
              >
                <Select mode='multiple'>
                  {Array.isArray(countries) &&
                    countries.map(country => (
                      <Option key={country.numeric_code} value={country.numeric_code} data={country}>
                        {country.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.get('todo.deliveries.form.registrationTitle')}
                name={['audience', 'registration_methods']}
              >
                <Checkbox.Group options={TYPE_REGISTRATION} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <GeoFormList countries={countries} form={form} />
          </Row>
        </ST.Section>
      </Form>
    </ST.FormWrapper>
  )
}

CampaignsBotStepsTargeting.propTypes = {
  values: PropTypes.shape({}),
  setAntdData: PropTypes.func.isRequired,
  setAntdComplete: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired
}

CampaignsBotStepsTargeting.defaultProps = {
  values: {}
}

export default CampaignsBotStepsTargeting
