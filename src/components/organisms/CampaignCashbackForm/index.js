import React, { useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Steps } from 'antd'
import SettingsForm from './SettingsForm'
import ProductsForm from './ProductsForm'
import TargetingForm from './ReTargetingForm'
import CardForm from './CardForm'
import * as ST from './styles'

const { Step } = Steps

const steps = [
  {
    title: intl.get('campaigns.cashbacks.steps.settings.title')
  },
  {
    title: intl.get('campaigns.cashbacks.steps.products.title')
  },
  {
    title: intl.get('campaigns.cashbacks.steps.steps.title')
  },
  {
    title: intl.get('campaigns.cashbacks.steps.targeting.title')
  }
]
const formInitialValues = {
  options: {
    currency: 'aud',
    auto_approve: false
  },
  card: {
    steps: [
      {
        title: 'Verify phone if req',
        type: 'phone_verification'
      },
      {
        title: 'Add account id',
        type: 'cashout_account'
      },
      {
        title: 'Add receipt',
        type: 'receipt'
      }
    ]
  },
  messages: [
    {
      type: 'ACCPET'
    },
    {
      type: 'REJECT'
    },
    {
      type: 'PENDING'
    },
    {
      type: 'MANUAL_REJECT'
    }
  ],
  audience: {}
}
const CashbackForm = ({ cashback, onFinish, onPublished }) => {
  const [current, setCurrent] = useState(0)
  const initialValues = cashback || formInitialValues
  const [cashbackValues, setCashbackValues] = useState(initialValues)
  const updatedValues = values => {
    const updateValues = { ...cashbackValues }
    const cloneValues = { ...values }
    if (cloneValues.card) {
      updateValues.card = { ...cashbackValues.card, ...cloneValues.card }
      updateValues.card.name = cashbackValues.name
      // eslint-disable-next-line no-param-reassign
      delete cloneValues.card
    }
    if (cloneValues.options) {
      updateValues.options = { ...cashbackValues.options, ...cloneValues.options }
      // eslint-disable-next-line no-param-reassign
      delete cloneValues.options
    }
    if (cloneValues.audience) {
      updateValues.audience = { ...cashbackValues.audience, ...cloneValues.audience }
      // eslint-disable-next-line no-param-reassign
      delete cloneValues.audience
    }
    if (cloneValues.range_dates) {
      const [startDate, endDate] = cloneValues.range_dates
      updateValues.start_date = `${startDate.utc().format('YYYY-MM-DD')}T${startDate.format('HH:mm:ss')}Z`
      updateValues.end_date = `${endDate.utc().format('YYYY-MM-DD')}T${endDate.format('HH:mm:ss')}Z`
      delete cloneValues.range_dates
    }
    if (cloneValues.receipt_range_dates) {
      const [startDate, endDate] = cloneValues.receipt_range_dates
      updateValues.options.receipt_date_from = `${startDate.utc().format('YYYY-MM-DD')}T${startDate.format(
        'HH:mm:ss'
      )}Z`
      updateValues.options.receipt_date_to = `${endDate.utc().format('YYYY-MM-DD')}T${endDate.format('HH:mm:ss')}Z`
      delete cloneValues.receipt_range_dates
    }
    return [updateValues, cloneValues]
  }
  const next = values => {
    const [updateValues, cloneValues] = updatedValues(values)
    setCashbackValues({ ...updateValues, ...cloneValues })
    setCurrent(current + 1)
  }

  const prev = values => {
    const [updateValues, cloneValues] = updatedValues(values)
    setCashbackValues({ ...updateValues, ...cloneValues })
    setCurrent(current - 1)
  }
  const handleSubmit = values => {
    const [updateValues, cloneValues] = updatedValues(values)
    if (updateValues.audience.gender && updateValues.audience.gender === 'any') delete updateValues.audience.gender
    if (updateValues.audience.max_age === 0) {
      delete updateValues.audience.max_age
      delete updateValues.audience.min_age
    }
    setCashbackValues({ ...updateValues, ...cloneValues })
    onFinish({ ...updateValues, ...cloneValues })
  }
  const published = values => {
    const [updateValues, cloneValues] = updatedValues(values)
    setCashbackValues({ ...updateValues, ...cloneValues })
    onPublished({ ...updateValues, ...cloneValues })
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
        {current === 0 && (
          <SettingsForm next={next} initialValues={cashbackValues} onPublished={published} onSave={handleSubmit} />
        )}
        {current === 1 && (
          <ProductsForm
            next={next}
            prev={prev}
            initialValues={cashbackValues}
            onPublished={published}
            onSave={handleSubmit}
          />
        )}
        {current === 2 && (
          <CardForm
            next={next}
            prev={prev}
            initialValues={cashbackValues}
            onPublished={published}
            onSave={handleSubmit}
          />
        )}
        {current === 3 && (
          <TargetingForm onFinish={handleSubmit} prev={prev} initialValues={cashbackValues} onPublished={published} />
        )}
      </div>
    </ST.StepWrapper>
  )
}
CashbackForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cashback: PropTypes.object,
  onFinish: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired
}

CashbackForm.defaultProps = {
  cashback: undefined
}
export default CashbackForm
