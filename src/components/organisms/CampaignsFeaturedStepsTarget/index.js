import React, { useEffect, useState } from 'react'
import { Form, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { settingsGetLanguages } from 'store/actions'
import PropTypes from 'prop-types'
import useCountries from '../../../data/settings/agt/countries'
import PreAudient from '../../molecules/Location/PreAudient'
import GeoFormList from '../../molecules/Location/GeoFormList'
import * as ST from '../../molecules/Location/styles'
import '../../molecules/Location/styles.css'

const CampaignsFeatureStepsTarget = ({ values: initialValues, form, setAntdData, setAntdComplete }) => {
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
    initialValues.audience !== undefined ? initialValues.audience.ageRange[0] : 0,
    initialValues.audience !== undefined ? initialValues.audience.ageRange[1] : 0
  ])
  const onFinish = values => {
    const cloneValues = values
    const [min, max] = ageRange
    cloneValues.audience.min_age = min
    cloneValues.audience.max_age = max
    setAntdData(cloneValues)
    setAntdComplete(true)
  }
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
            <GeoFormList countries={countries} form={form} />
          </Row>
        </ST.Section>
      </Form>
    </ST.FormWrapper>
  )
}

CampaignsFeatureStepsTarget.propTypes = {
  values: PropTypes.shape({}),
  setAntdData: PropTypes.func.isRequired,
  setAntdComplete: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired
}

CampaignsFeatureStepsTarget.defaultProps = {
  values: {}
}

export default CampaignsFeatureStepsTarget
