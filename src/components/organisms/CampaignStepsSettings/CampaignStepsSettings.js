import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Checkbox, Form, Input, Select, Tooltip, InputNumber } from 'antd'
import intl from 'react-intl-universal'
import moment from 'moment'
import { nameType } from '../../../utils/consts'
import * as ST from './styles'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import Error from '../../atoms/Error'
import RadioGroup from '../../atoms/RadioGroup'
import { RADIO_GROUP_DELIVERY_TIME } from '../../pages/TodoDeliveryEditor/consts'
import { rewardsIntervalOptions, restrictionGroup } from './consts'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import { hasNoRestrictions } from '../../../utils/campaign'
import RewardsAdjustmentBlock from '../../atoms/RewardsAdjustmentBlock'
import BudgetBlock from '../../atoms/BudgetBlock'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import { formatDate } from '../../../utils/helpers/date'

const { Option } = Select

const CampaignStepsSettings = ({
  register,
  errors,
  setValue,
  values,
  rewardsActions,
  settingsGetRewardsActions,
  rewardsGetAdjustmentBudgetRate,
  isLoadingActions,
  watch,
  isSystem,
  points,
  setIsSubmit,
  triggerValidation,
  clearError,
  setError
}) => {
  const actionWatcher = watch('action')
  const rewardsAdjustmentActiveWatcher = watch('rewardAdjustmentActive')
  const coinsWatcher = watch('points')
  const budgetWatcher = watch('budget.per_interval')

  useEffect(() => {
    register({ name: 'isHaveRestrictions' })

    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(isValidate => {
            resolve(isValidate)
          })
        })
    })
  }, [])

  useEffect(() => {
    setValue('isHaveRestrictions', !hasNoRestrictions(actionWatcher, rewardsActions))

    if (!actionWatcher) {
      setValue('action', undefined)
    }
  }, [actionWatcher, rewardsActions])

  useEffect(() => {
    if (rewardsAdjustmentActiveWatcher) {
      setValue('points', points)
    }
  }, [rewardsAdjustmentActiveWatcher])

  useEffect(() => {
    if (points || points === '0') {
      setValue('points', Number(points))
      clearError('points')
    }
  }, [points])

  useEffect(() => {
    if (budgetWatcher && (parseFloat(budgetWatcher) || 0) < parseFloat(coinsWatcher)) {
      setError(
        'budget.per_interval',
        'budgetLessThenCoinsError',
        intl.get('campaigns.rewards.budgetLessThenCoinsError')
      )
    } else {
      clearError('budget.per_interval')
    }
  }, [budgetWatcher, coinsWatcher])

  const intervalWatcher = watch('budget.interval')
  const intervalLabel = useMemo(() => {
    const selectedItem = rewardsIntervalOptions.find(elem => elem.value === intervalWatcher)
    return selectedItem && selectedItem.input
  }, [intervalWatcher, rewardsIntervalOptions])

  const rewardsActionsOptions = useMemo(() => {
    let result = []

    if (rewardsActions && rewardsActions.length) {
      const filteredActions = isSystem
        ? [...rewardsActions]
        : rewardsActions.filter(el => el.text_i18n_id !== 'rewards_actions-upload_receipt')
      result = filteredActions.map(action => ({
        value: action.id,
        label: action[nameType]
      }))
    }

    return result
  }, [rewardsActions, nameType, isSystem])

  useEffect(() => {
    if (!isLoadingActions && (!rewardsActions || !rewardsActions.length)) {
      settingsGetRewardsActions()
    }

    register({ name: 'start_date' })
    register({ name: 'end_date' })
  }, [])

  const handleDatePickerChange = useCallback((value, nameField) => {
    if (value) {
      setValue(nameField, value.format('M/D/YYYY'))
    } else {
      setValue(nameField, '')
    }
  }, [])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const disabledEndDate = current => {
    return current && current < moment(values.start_date, 'M/D/YYYY').endOf('day')
  }

  return (
    <ST.StyledForm>
      <Form.Item label={intl.get('campaigns.rewards.form.nameTitle')}>
        <ST.FieldsWrapper flexBasis='75%'>
          <ST.Field>
            <RHFInput
              as={<Input size='large' placeholder={intl.get('campaigns.rewards.form.namePlaceholder')} />}
              name='name'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              setValue={setValue}
              defaultValue={values.name}
              mode='onChange'
            />
            <Error errors={errors} destination='name' />
          </ST.Field>
          <Checkbox
            size='large'
            defaultChecked={values && values.partner_brand}
            checked={values && values.partner_brand}
            onChange={event => {
              register({ name: `partner_brand` })
              setValue(`partner_brand`, event.target.checked)
            }}
          >
            {intl.get('campaigns.rewards.form.partnerBrand')}
          </Checkbox>
        </ST.FieldsWrapper>
      </Form.Item>
      <Form.Item label={intl.get('campaigns.rewards.form.actionTitle')}>
        <ST.FieldsWrapper>
          <ST.Field>
            <RHFInput
              as={
                <Select
                  showSearch
                  optionFilterProp='children'
                  getPopupContainer={trigger => trigger.parentNode}
                  size='large'
                  placeholder={intl.get('campaigns.rewards.form.actionPlaceholder')}
                >
                  {rewardsActionsOptions && rewardsActionsOptions.length
                    ? rewardsActionsOptions.map(action => (
                        <Option key={action.value} value={action.value}>
                          {action.label}
                        </Option>
                      ))
                    : null}
                </Select>
              }
              name='action'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              setValue={setValue}
              defaultValue={values.action}
              mode='onChange'
            />
            <Error errors={errors} destination='action' />
          </ST.Field>
          <ST.Field>
            {values && values.rewardAdjustmentActive ? (
              <CustomInputNumber isSelectsDisable value={values.points} size='large' />
            ) : (
              <RHFInput
                as={
                  <CustomInputNumber
                    isSelectsDisable={!!(values && values.rewardAdjustmentActive)}
                    size='large'
                    placeholder={intl.get('campaigns.rewards.form.actionValuePlaceholder')}
                  />
                }
                name='points'
                rules={{ required: intl.get('todo.cards.form.required') }}
                register={register}
                setValue={setValue}
                defaultValue={values.points}
                mode='onChange'
              />
            )}
            <Error errors={errors} destination='points' />
          </ST.Field>
        </ST.FieldsWrapper>
      </Form.Item>
      <ST.ConditionsWrapper isVisible={values && values.action === 'upload_receipt'}>
        <Form.Item label={intl.get('campaigns.rewards.form.nameTitleRecognizedReceipt')}>
          <Checkbox
            size='large'
            defaultChecked={values && values.receipt_active}
            checked={values && values.receipt_active}
            onChange={() => {
              register({ name: `receipt_active` })
              setValue(`receipt_active`, !values.receipt_active)
            }}
          >
            {intl.get(
              values.receipt_active
                ? 'campaigns.rewards.form.recognizedReceiptActive'
                : 'campaigns.rewards.form.recognizedReceiptInactive'
            )}
          </Checkbox>
        </Form.Item>
      </ST.ConditionsWrapper>
      <Form.Item label={intl.get('campaigns.rewards.form.frequencyTitle')}>
        <RHFInput
          as={<RadioGroup group={RADIO_GROUP_DELIVERY_TIME} />}
          name='campaignTime'
          register={register}
          setValue={setValue}
          defaultValue={values && values.campaignTime}
        />
        <ST.ConditionsWrapper isVisible={values && values.campaignTime === 'setData'}>
          <ST.PickersWrapper>
            {['start_date', 'end_date'].map(key => (
              <LocalDatePicker
                key={key}
                dateValue={values && values[key] && moment(values[key], 'M/D/YYYY')}
                handleDatePickerChange={value => handleDatePickerChange(value, key)}
                placeholder={intl.get(`campaigns.rewards.form.${key}`)}
                disabledDate={key === 'start_date' ? disabledDate : disabledEndDate}
              />
            ))}
          </ST.PickersWrapper>
        </ST.ConditionsWrapper>
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.rewardsAdjustmentTitle')}>
        <Checkbox
          size='large'
          defaultChecked={values && values.rewardAdjustmentActive}
          checked={values && values.rewardAdjustmentActive}
          onChange={() => {
            register({ name: `rewardAdjustmentActive` })
            setValue(`rewardAdjustmentActive`, !values.rewardAdjustmentActive)
          }}
        >
          {intl.get(
            values.rewardAdjustmentActive
              ? 'todo.deliveries.form.rewardsAdjustmentActive'
              : 'todo.deliveries.form.rewardsAdjustmentInactive'
          )}
        </Checkbox>
        <ST.ConditionsWrapper isVisible={values && values.rewardAdjustmentActive}>
          <RewardsAdjustmentBlock
            values={values}
            getAdjustmentBudgetRate={rewardsGetAdjustmentBudgetRate}
            watch={watch}
            register={register}
            clearError={clearError}
            setError={setError}
            errors={errors}
            setValue={setValue}
            budgetKey='budget.per_interval'
          />
        </ST.ConditionsWrapper>
      </Form.Item>
      <Form.Item label={intl.get('campaigns.rewards.form.budgetTitle')}>
        <RHFInput
          as={<RadioGroup group={rewardsIntervalOptions} />}
          name='budget.interval'
          register={register}
          setValue={setValue}
          defaultValue={values && values.budget && values.budget.interval}
        />
      </Form.Item>
      <BudgetBlock
        name='budget.per_interval'
        label={intervalLabel}
        values={values}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      {values && values.spendings && values.spendings[values && values.budget && values.budget.interval] && (
        <Tooltip
          title={intl.get(`campaigns.rewards.form.budgetSpendingsText_${values.budget.interval}`, {
            coins: `${convertFromUint256(values.spendings[values.budget.interval].coins)} SHPING`,
            date: formatDate(values.spendings[values.budget.interval].since, {
              parseFormat: 'yyyy-MM-dd'
            })
          })}
        >
          <ST.StyledLink>
            {intl.get(
              `campaigns.rewards.form.budgetSpendingsLabel_${values && values.budget && values.budget.interval}`
            )}
          </ST.StyledLink>
        </Tooltip>
      )}
      <ST.ConditionsWrapper isVisible={values.isHaveRestrictions}>
        <Form.Item label={intl.get('campaigns.rewards.form.conditionTitle')}>
          <Checkbox
            size='large'
            defaultChecked={values && values.location}
            checked={values && values.location}
            onChange={() => {
              register({ name: `location` })
              setValue(`location`, !values.location)
            }}
          >
            {intl.get('campaigns.rewards.form.conditionUniqueLocation')}
          </Checkbox>
        </Form.Item>
        <Form.Item label={intl.get('campaigns.rewards.form.conditionTimeTitle')}>
          <ST.FieldsWrapper flexBasis='55%'>
            <ST.FieldsWrapper flexBasis='25%'>
              <ST.Field>
                <RHFInput
                  as={<InputNumber size='large' disabled={values.allOptions || values.condition === 'once'} />}
                  name='count'
                  register={register}
                  setValue={setValue}
                  defaultValue={(values && values.count) || 1}
                />
              </ST.Field>
              <ST.Field style={{ flexBasis: '70%' }}>
                <RHFInput
                  as={
                    <Select size='large' disabled={values.allOptions}>
                      {restrictionGroup && restrictionGroup.length
                        ? restrictionGroup.map(action => (
                            <Option key={action.value} value={action.value}>
                              {action.label}
                            </Option>
                          ))
                        : null}
                    </Select>
                  }
                  name='condition'
                  register={register}
                  setValue={setValue}
                  onChange={value => {
                    if (['daily', 'weekly', 'monthly'].includes(value) && values.count === undefined) {
                      setValue('count', 1)
                    }
                  }}
                  defaultValue={values && values.condition}
                />
              </ST.Field>
            </ST.FieldsWrapper>
          </ST.FieldsWrapper>
          <Checkbox
            size='large'
            defaultChecked={values && values.allOptions}
            checked={values && values.allOptions}
            onChange={() => {
              register({ name: `allOptions` })
              setValue(`allOptions`, !values.allOptions)
              if (!values.allOptions) {
                setValue('condition', 'global_once')
              }
            }}
          >
            {intl.get('campaigns.rewards.form.conditionAllOptionsLabel')}
          </Checkbox>
        </Form.Item>
      </ST.ConditionsWrapper>
    </ST.StyledForm>
  )
}

CampaignStepsSettings.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  rewardsActions: PropTypes.arrayOf(PropTypes.object),
  settingsGetRewardsActions: PropTypes.func.isRequired,
  isLoadingActions: PropTypes.bool,
  watch: PropTypes.func.isRequired,
  isSystem: PropTypes.bool.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  points: PropTypes.string,
  rewardsGetAdjustmentBudgetRate: PropTypes.func.isRequired
}

CampaignStepsSettings.defaultProps = {
  errors: {},
  values: {},
  rewardsActions: [],
  isLoadingActions: false,
  points: null
}

export default CampaignStepsSettings
