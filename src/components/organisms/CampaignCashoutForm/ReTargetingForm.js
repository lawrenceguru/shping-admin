import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Divider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import PublishConfirmDialog from './PublishConfirmDialog'
import useDisableButton from '../../../hooks/useDisableButton'
import useCountries from '../../../data/settings/agt/countries'
import PreAudient from '../../molecules/Location/PreAudient'
import GeoFormList from '../../molecules/Location/GeoFormList'
import * as ST from '../../molecules/Location/styles'
import '../../molecules/Location/styles.css'
// import usePostcodes from '../../../data/settings/agt/postcodes'
// import useRetailers from '../../../data/pam/retailers'

const ReTargetingForm = ({ initialValues, prev, onFinish, onPublished }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { result: countries } = useCountries()
  const languages = useSelector(({ settings }) => settings.languages)
  const dispatch = useDispatch()
  const [country, setCountry] = useState('036')
  useEffect(() => {
    console.log(country)
  }, [country])
  // const { retailers: reRetailers } = useRetailers(country)
  // const { result: rePostcodes } = usePostcodes(country)
  // let uniquePostcodes = []
  // if (Array.isArray(rePostcodes)) {
  //   uniquePostcodes = [...new Map(rePostcodes.map(item => [item.postcode, item])).values()]
  // }
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
  const [disabledSave, setDisabledSave] = useDisableButton(false)
  // const [rePostcodes, setRePostcodes] = useState()
  // const [reRetailers, setReRetailers] = useState()
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
  const handleCancel = () => {
    history.push('/admin/campaigns/cashout')
  }
  return (
    <ST.FormWrapperCashback>
      <Form
        name='geo-target-form'
        id='geo-target-form'
        layout='vertical'
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <PreAudient setAgeRange={setAgeRange} ageRange={ageRange} languages={languages} />
          </Row>
          <Row gutter={16}>
            <GeoFormList countries={countries} form={form} setCountry={setCountry} />
          </Row>
        </ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={6}>
            <Button type='primary' onClick={handlePrev}>
              {intl.get('campaigns.cashbacks.actions.previous')}
            </Button>
          </Col>
          <Col className='gutter-row' span={18} style={{ textAlign: 'right' }}>
            <Button
              className='cancelButton'
              size='large'
              onClick={handleCancel}
              style={{
                color: '#5d5fef',
                border: 0,
                borderBottom: '2px solid #f5f2f2'
              }}
            >
              {intl.get('cancel')}
            </Button>
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
    </ST.FormWrapperCashback>
  )
}

ReTargetingForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
}

export default ReTargetingForm
