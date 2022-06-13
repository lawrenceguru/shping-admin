import React, { useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Steps } from 'antd'
import SettingsForm from './SettingsForm'
import AudienceForm from './AudienceForm'
import CTAForm from './CTAForm'
import * as ST from './styles'

const { Step } = Steps

const steps = [
  {
    title: intl.get('campaigns.shoppingListAds.steps.settings.title')
  },
  {
    title: intl.get('campaigns.shoppingListAds.steps.audience.title')
  },
  {
    title: intl.get('campaigns.shoppingListAds.steps.cta.title')
  }
]
const formInitialValues = {
  type: '',
  info_type: []
}
const AdForm = ({ ad, onFinish }) => {
  const [current, setCurrent] = useState(0)
  const initialValues = ad || formInitialValues
  const [adValues, setAdValues] = useState(initialValues)
  const [audienceInitialValues, setAudienceInitialValues] = useState(() => {
    if (ad && Array.isArray(ad.audience) && ad.audience.length > 0) {
      const [item] = ad.audience
      return item
    }
    return { min_age: 15, max_age: 30, gender: [], language: [], location: [], user_levels: [] }
  })
  const next = values => {
    if (current === 1) setAudienceInitialValues(values)
    else setAdValues({ ...adValues, ...values })
    setCurrent(current + 1)
  }

  const prev = values => {
    if (current === 1) setAudienceInitialValues(values)
    else setAdValues({ ...adValues, ...values })
    setCurrent(current - 1)
  }
  const handleSubmit = values => {
    setAdValues({ ...adValues, ...values })
    onFinish({ ...adValues, ...values }, audienceInitialValues)
  }
  return (
    <ST.StepWrapper>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <br />
      <div>
        {current === 0 && <SettingsForm next={next} initialValues={adValues} />}
        {current === 1 && <AudienceForm next={next} prev={prev} initialValues={audienceInitialValues} />}
        {current === 2 && <CTAForm onFinish={handleSubmit} prev={prev} initialValues={adValues} />}
      </div>
    </ST.StepWrapper>
  )
}
AdForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ad: PropTypes.object,
  onFinish: PropTypes.func.isRequired
}

AdForm.defaultProps = {
  ad: { info_type: [] }
}
export default AdForm
