import React, { useEffect } from 'react'
import { Form } from 'antd'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import PropTypes from 'prop-types'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import { validateGraterThenZeroForFloat, validateMaxLengthForFloat } from '../../../utils/validation'
import * as ST from './styles'
import Error from '../Error'
import { noExponents, normalizeFloat } from '../../../utils/helpers/mathOperations'

const RewardsAdjustmentBlock = ({
  getAdjustmentConvertedBudget,
  getAdjustmentBudgetRate,
  convertedBudget,
  errors,
  register,
  setValue,
  watch,
  values,
  budgetKey,
  clearError,
  setError
}) => {
  const rewardAdjustmentActiveWatcher = watch('rewardAdjustmentActive')
  const resultWatcher = watch('adjustment.result')
  const coinsStepWatcher = watch('adjustment.coins_step')
  const budgetWatcher = watch(budgetKey)

  useEffect(() => {
    if (!rewardAdjustmentActiveWatcher) {
      clearError(`adjustment.result`)
      clearError(`adjustment.coins_step`)
    }
  }, [rewardAdjustmentActiveWatcher])

  useEffect(() => {
    if (rewardAdjustmentActiveWatcher && !coinsStepWatcher) {
      setError('adjustment.coins_step', 'required', intl.get('todo.cards.form.required'))
    }
  }, [rewardAdjustmentActiveWatcher, coinsStepWatcher])

  useEffect(() => {
    if (rewardAdjustmentActiveWatcher && !resultWatcher) {
      setError('adjustment.result', 'required', intl.get('todo.cards.form.required'))
    }
  }, [rewardAdjustmentActiveWatcher, resultWatcher])

  useEffect(() => {
    if (resultWatcher && coinsStepWatcher && !errors['adjustment.coins_step'] && !errors['adjustment.result']) {
      getAdjustmentBudgetRate({
        result: parseFloat(resultWatcher),
        coins_step: normalizeFloat(coinsStepWatcher)
      })
    }
  }, [resultWatcher, coinsStepWatcher, errors])

  useEffect(() => {
    if (
      getAdjustmentConvertedBudget &&
      resultWatcher &&
      coinsStepWatcher &&
      budgetWatcher &&
      !errors['adjustment.coins_step'] &&
      !errors['adjustment.result'] &&
      !errors[budgetKey]
    ) {
      getAdjustmentConvertedBudget({
        result: parseFloat(resultWatcher),
        coins_step: normalizeFloat(coinsStepWatcher),
        maximum: normalizeFloat(budgetWatcher)
      })
    }
  }, [resultWatcher, coinsStepWatcher, errors, budgetWatcher])

  useEffect(() => {
    let render = ''

    if (convertedBudget) {
      const budgetWithoutExponent = noExponents(convertedBudget)
      const toStringBudget = budgetWithoutExponent.toString().split('.')
      if (toStringBudget.length > 1) {
        render = `${toStringBudget[0]}.${toStringBudget[1].substr(0, 2)}`
      } else if (convertedBudget === Infinity) {
        render = '0'
      } else {
        render = convertedBudget
      }
    }

    register({ name: 'convertedBudget' })
    setValue('convertedBudget', render === '0.00' ? '0' : render)
  }, [convertedBudget])

  return (
    <>
      <ST.FieldsWrapper>
        <ST.Field>
          <Form.Item label={intl.get('todo.deliveries.form.rewardsAdjustmentAmountTitle', { currency: 'AUD' })}>
            <RHFInput
              as={<CustomInputNumber size='large' />}
              name='adjustment.result'
              rules={{
                validate: {
                  minValue: validateGraterThenZeroForFloat
                }
              }}
              register={register}
              setValue={setValue}
              defaultValue={values && values.adjustment && values.adjustment.result}
              mode='onChange'
            />
            <Error errors={errors} destination='adjustment.result' />
          </Form.Item>
        </ST.Field>
        <ST.Field>
          <Form.Item label={intl.get('campaigns.rewards.form.rewardsAdjustmentStepTitle')}>
            <RHFInput
              as={<CustomInputNumber size='large' />}
              name='adjustment.coins_step'
              rules={{
                validate: {
                  minValue: validateGraterThenZeroForFloat,
                  maxValue: validateMaxLengthForFloat
                }
              }}
              register={register}
              setValue={setValue}
              defaultValue={values && values.adjustment && values.adjustment.coins_step}
              mode='onChange'
            />
            <Error errors={errors} destination='adjustment.coins_step' />
          </Form.Item>
        </ST.Field>
      </ST.FieldsWrapper>
      <ST.Header>{intl.get('campaigns.rewards.form.rewardsSubtitle')}</ST.Header>
    </>
  )
}
RewardsAdjustmentBlock.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  watch: PropTypes.func.isRequired,
  getAdjustmentConvertedBudget: PropTypes.func,
  convertedBudget: PropTypes.number,
  budgetKey: PropTypes.string,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  getAdjustmentBudgetRate: PropTypes.func.isRequired
}

RewardsAdjustmentBlock.defaultProps = {
  errors: {},
  values: {},
  convertedBudget: null,
  budgetKey: 'budget',
  getAdjustmentConvertedBudget: null
}

export default RewardsAdjustmentBlock
