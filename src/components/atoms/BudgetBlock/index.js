import React from 'react'
import { Form } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import { validateGraterThenZeroForFloat, validateMaxLengthForFloat } from '../../../utils/validation'
import IconButton from '../../molecules/IconButton'
import Error from '../Error'

const BudgetBlock = ({ name, required, label, values, register, setValue, errors }) => {
  return (
    <Form.Item label={label}>
      <ST.BudgetInputWrapper>
        <RHFInput
          as={<CustomInputNumber size='large' placeholder={intl.get('todo.deliveries.form.budgetPlaceholder')} />}
          name={name}
          rules={{
            required: required && intl.get('todo.cards.form.required'),
            validate: {
              minValue: validateGraterThenZeroForFloat,
              maxValue: validateMaxLengthForFloat
            }
          }}
          register={register}
          setValue={setValue}
          defaultValue={values && values.budget && values.budget.per_interval}
          mode='onChange'
        />
        {values && values.rewardAdjustmentActive && (
          <>
            <IconButton type='Exchange' />
            <span>{`${values.convertedBudget ? `${values.convertedBudget} AUD` : `${0} AUD`}`}</span>
          </>
        )}
      </ST.BudgetInputWrapper>
      <Error destination={name} errors={errors} />
      {values && values.rewardAdjustmentActive && (
        <ST.Header>{intl.get('todo.deliveries.form.rewardsDailyMaximum')}</ST.Header>
      )}
    </Form.Item>
  )
}

BudgetBlock.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool
}

BudgetBlock.defaultProps = {
  errors: {},
  values: {},
  label: null,
  name: 'budget',
  required: false
}

export default BudgetBlock
