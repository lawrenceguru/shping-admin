import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Form, Row, Col, Select, Checkbox, DatePicker } from 'antd'
import intl from 'react-intl-universal'
import useCountries from '../../../data/settings/agt/countries'
import PreAudient from '../../molecules/Location/PreAudient'
import GeoFormList from '../../molecules/Location/GeoFormList'
// import LocalDatePicker from '../../atoms/LocalDatePicker'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import * as ST from '../../molecules/Location/styles'
import '../../molecules/Location/styles.css'

const { Option } = Select
const { RangePicker } = DatePicker
const CampaignsStepsShououtTargeting = ({ values: initialValues, form, setAntdData, setAntdComplete }) => {
  const IV = initialValues
  const { result: countries } = useCountries()
  const languages = useSelector(({ settings }) => settings.languages)
  const dispatch = useDispatch()
  useEffect(() => {
    if (languages.length === 0) dispatch(settingsGetLanguages())
  }, [languages])
  const [ageRange, setAgeRange] = useState([
    initialValues.audience !== undefined ? initialValues.audience.min_age : 0,
    initialValues.audience !== undefined ? initialValues.audience.max_age : 0
  ])
  const [scanDate, setScanDate] = useState()
  const [scanDateInverse, setScanDateInverse] = useState(false)

  const [brandScansFrom, setBrandScansFrom] = useState()
  const [brandScansTo, setBrandScansTo] = useState()
  const [brandScansInverse, setBrandScansInverse] = useState(false)
  const [brandScansData, setBrandScansData] = useState({ from: '', to: '' })

  const [weekScanInverse, setWeekScanInverse] = useState(false)
  const [weekScanData, setWeekScanData] = useState({ from: '', to: '' })
  const [scanCountryInverse, setScanCountryInverse] = useState(false)
  const [scanCountryData, setScanCountryData] = useState()
  useEffect(() => {
    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.brand_scans &&
      IV.audience.advanced.brand_scans.date_from
    ) {
      setBrandScansFrom(IV.audience.advanced.brand_scans.date_from)
    }
    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.brand_scans &&
      IV.audience.advanced.brand_scans.date_to
    ) {
      setBrandScansTo(IV.audience.advanced.brand_scans.date_to)
    }
    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.brand_scans &&
      IV.audience.advanced.brand_scans.inverse
    ) {
      setBrandScansInverse(IV.audience.advanced.brand_scans.inverse)
    }

    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.last_scan_date &&
      IV.audience.advanced.last_scan_date.date
    ) {
      setScanDate(IV.audience.advanced.last_scan_date.date)
    }
    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.last_scan_date &&
      IV.audience.advanced.last_scan_date.inverse
    ) {
      setScanDateInverse(IV.audience.advanced.last_scan_date.inverse)
    }

    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.countries &&
      IV.audience.advanced.countries.inverse
    ) {
      setScanCountryInverse(IV.audience.advanced.countries.inverse)
    }

    if (
      IV.audience &&
      IV.audience.advanced &&
      IV.audience.advanced.weekly_scans &&
      IV.audience.advanced.weekly_scans.inverse
    ) {
      setWeekScanInverse(IV.audience.advanced.weekly_scans.inverse)
    }
  }, [])

  const onFinish = values => {
    const cloneIV = values
    if (
      cloneIV.audience &&
      cloneIV.audience.advanced &&
      cloneIV.audience.advanced.brand_scans &&
      cloneIV.audience.advanced.brand_scans.scans_from
    ) {
      cloneIV.audience.advanced.brand_scans.scans_from = Number(cloneIV.audience.advanced.brand_scans.scans_from)
    }
    if (
      cloneIV.audience &&
      cloneIV.audience.advanced &&
      cloneIV.audience.advanced.brand_scans &&
      cloneIV.audience.advanced.brand_scans.scans_to
    ) {
      cloneIV.audience.advanced.brand_scans.scans_to = Number(cloneIV.audience.advanced.brand_scans.scans_to)
    }

    if (
      cloneIV.audience &&
      cloneIV.audience.advanced &&
      cloneIV.audience.advanced.weekly_scans &&
      cloneIV.audience.advanced.weekly_scans.from
    ) {
      cloneIV.audience.advanced.weekly_scans.from = Number(cloneIV.audience.advanced.weekly_scans.from)
    }
    if (
      cloneIV.audience &&
      cloneIV.audience.advanced &&
      cloneIV.audience.advanced.weekly_scans &&
      cloneIV.audience.advanced.weekly_scans.to
    ) {
      cloneIV.audience.advanced.weekly_scans.to = Number(cloneIV.audience.advanced.weekly_scans.to)
    }
    const [min, max] = ageRange
    cloneIV.audience.min_age = min
    cloneIV.audience.max_age = max
    cloneIV.audience.advanced.brand_scans.date_from = brandScansFrom
    cloneIV.audience.advanced.brand_scans.date_to = brandScansTo
    cloneIV.audience.advanced.brand_scans.inverse = brandScansInverse

    cloneIV.audience.advanced.last_scan_date = { data: '', inverse: false }
    cloneIV.audience.advanced.last_scan_date.date = scanDate
    cloneIV.audience.advanced.last_scan_date.inverse = scanDateInverse

    cloneIV.audience.advanced.countries.inverse = scanCountryInverse
    cloneIV.audience.advanced.weekly_scans.inverse = weekScanInverse
    setAntdData(cloneIV)
    setAntdComplete(true)
  }
  const disabledDate = useCallback(
    current => {
      return current && current < moment().endOf('day')
    },
    [moment]
  )
  const onChange = value => {
    if (value) {
      setBrandScansFrom(value[0] && value[0].format('YYYY-MM-DD'))
      setBrandScansTo(value[1] && value[1].format('YYYY-MM-DD'))
    } else {
      setBrandScansFrom()
      setBrandScansTo()
    }
  }
  return (
    <ST.FormWrapper>
      <Form
        name='geo-target-form'
        id='geo-target-form'
        layout='vertical'
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <PreAudient setAgeRange={setAgeRange} ageRange={ageRange} languages={languages} />
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p className='contextAudienceTitle'>{intl.get('campaigns.shoutouts.form.brandScansTitle')}</p>
            </Col>
          </Row>
          <Row gutter={16} justify='space-around' align='middle'>
            <Col span={4}>
              <Form.Item name={['audience', 'advanced', 'brand_scans', 'scans_from']}>
                <CustomInputNumber
                  placeholder={intl.get('campaigns.shoutouts.form.brandScansFromPlaceholder')}
                  onChange={val => setBrandScansData({ ...brandScansData, from: val.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={['audience', 'advanced', 'brand_scans', 'scans_to']}>
                <CustomInputNumber
                  placeholder={intl.get('campaigns.shoutouts.form.weeklyScansToPlaceholder')}
                  onChange={val => setBrandScansData({ ...brandScansData, to: val.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className='rageDatePicker'>
                <RangePicker
                  onChange={val => onChange(val)}
                  value={[
                    brandScansFrom && moment(brandScansFrom, 'YYYY/MM/DD'),
                    brandScansTo && moment(brandScansTo, 'YYYY/MM/DD')
                  ]}
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>
            <Col span={4} offset={4}>
              <Form.Item>
                <Checkbox
                  size={8}
                  checked={brandScansInverse}
                  onChange={() => setBrandScansInverse(!brandScansInverse)}
                  disabled={!(brandScansTo && brandScansFrom && brandScansData.from && brandScansData.to)}
                >
                  {intl.get('campaigns.shoutouts.form.brandScansInverse')}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p className='contextAudienceTitle'>{intl.get('campaigns.shoutouts.form.lastScanDateTitle')}</p>
            </Col>
          </Row>
          <Row gutter={16} justify='space-around' align='middle'>
            <Col span={10}>
              <Form.Item>
                <DatePicker
                  value={scanDate && moment(scanDate, 'YYYY/MM/DD')}
                  onChange={value => setScanDate(value && value.format('YYYY-MM-DD'))}
                  disabledDate={disabledDate}
                  className='lastScanDate'
                />
              </Form.Item>
            </Col>
            <Col span={4} offset={10}>
              <Form.Item>
                <Checkbox
                  checked={scanDateInverse}
                  onChange={() => setScanDateInverse(!scanDateInverse)}
                  disabled={!(scanDate && scanDate !== '')}
                >
                  {intl.get('campaigns.shoutouts.form.brandScansInverse')}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p className='contextAudienceTitle'>{intl.get('todo.deliveries.form.weeklyScansTitle')}</p>
            </Col>
          </Row>
          <Row gutter={16} justify='space-around' align='middle'>
            <Col span={8}>
              <Form.Item name={['audience', 'advanced', 'weekly_scans', 'from']}>
                <CustomInputNumber
                  placeholder={intl.get('todo.deliveries.form.weeklyScansFromPlaceholder')}
                  onChange={val => setWeekScanData({ ...weekScanData, from: val.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item name={['audience', 'advanced', 'weekly_scans', 'to']}>
                <CustomInputNumber
                  placeholder={intl.get('todo.deliveries.form.weeklyScansToPlaceholder')}
                  onChange={val => setWeekScanData({ ...weekScanData, to: val.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={4} offset={2}>
              <Form.Item>
                <Checkbox
                  checked={weekScanInverse && weekScanInverse}
                  onChange={() => setWeekScanInverse(!weekScanInverse)}
                  disabled={!(weekScanData.from && weekScanData.to)}
                >
                  {intl.get('campaigns.shoutouts.form.brandScansInverse')}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p className='contextAudienceTitle'>{intl.get('todo.deliveries.form.scannedCountriesTitle')}</p>
            </Col>
          </Row>
          <Row gutter={16} justify='space-around' align='middle'>
            <Col span={18}>
              <Form.Item name={['audience', 'advanced', 'countries', 'list']}>
                <Select mode='multiple' onChange={val => setScanCountryData(val)}>
                  {Array.isArray(countries) &&
                    countries.map(country => (
                      <Option key={country.numeric_code} value={country.numeric_code} data={country}>
                        {country.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} offset={2}>
              <Form.Item name={['audience', 'advanced', 'countries', 'inverse']}>
                <Checkbox
                  checked={scanCountryInverse}
                  onChange={() => setScanCountryInverse(!scanCountryInverse)}
                  disabled={!(scanCountryData && scanCountryData.length)}
                >
                  {intl.get('campaigns.shoutouts.form.brandScansInverse')}
                </Checkbox>
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

CampaignsStepsShououtTargeting.propTypes = {
  values: PropTypes.shape({}),
  setAntdData: PropTypes.func.isRequired,
  setAntdComplete: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired
}

CampaignsStepsShououtTargeting.defaultProps = {
  values: {}
}

export default CampaignsStepsShououtTargeting
