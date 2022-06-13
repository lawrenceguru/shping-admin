import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import { Form, Input, Select, Slider, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import IconButton from '../../molecules/IconButton'
import {
  StyledForm,
  InputWrapper,
  SliderWrapper,
  InputsWrapper,
  FieldWrapper,
  Header,
  ConditionsWrapper,
  WrappedText,
  BudgetInputWrapper,
  PickersWrapper
} from './styles'
import WidgetRemaining from '../../atoms/WidgetRemaining'
import { checkValueLength } from '../../../utils/validation'
import Error from '../../atoms/Error'
import TodoCardsTableField from '../TodoCardsTableField'
import RadioGroup from '../../atoms/RadioGroup'
import ProductsTableField from '../ProductsTableField'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import {
  TYPE_REGISTRATION,
  RADIO_GROUP_PRODUCT,
  AGE_MARKS,
  RADIO_GROUP_DELIVERY_TIME,
  RADIO_GROUP_GENDER,
  RADIO_GROUP_MODE
} from '../../pages/TodoDeliveryEditor/consts'
import { normalizeFloat, noExponents } from '../../../utils/helpers/mathOperations'

const { Option } = Select

const TodoDeliveryEditor = ({
  todoCards,
  countries,
  languages,
  watch,
  errors,
  clearError,
  setValue,
  register,
  unregister,
  isTodoCardsLoading,
  isLoadingCountries,
  isLoadingLanguages,
  values,
  setError,
  name,
  points,
  convertedBudget,
  todoGetAdjustmentBudgetRateTodoDelivery,
  todoGetAdjustmentConvertedBudgetTodoDelivery,
  isActive
}) => {
  const nameWatcher = watch('name')
  const resultWatcher = watch('adjustment.result')
  const coinsStepWatcher = watch('adjustment.coins_step')
  const budgetWatcher = watch('budget')
  const cardResultCoins = watch('card_result_coins')
  const cardIdWatcher = watch('card_id')
  const rewardAdjustmentActiveWatcher = watch('rewardAdjustmentActive')
  const modeWatcher = watch('mode')
  const startOffsetWatcher = watch('start_offset.months')
  const [hasBudget, setHasBudget] = useState(false)

  const remainingNameFieldValue = useMemo(() => {
    return 100 - ((values && values.name && values.name.length) || 0)
  }, [values.name])

  const renderBudget = useMemo(() => {
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

    return render === '0.00' ? '0' : render
  }, [convertedBudget])

  useEffect(() => {
    register({ name: 'start_date' })
    register({ name: 'end_date' })
    return () => {
      unregister(['start_date', 'end_date'])
    }
  }, [])

  useEffect(() => {
    setHasBudget(!!cardResultCoins)
  }, [cardResultCoins])

  useEffect(() => {
    if (nameWatcher && nameWatcher.length > 100) {
      setValue('name', nameWatcher.substr(0, 100))
      clearError('name')
    }
  }, [nameWatcher])

  useEffect(() => {
    if (cardIdWatcher) {
      clearError('card_id')
    }
  }, [cardIdWatcher])

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
    if (hasBudget && !budgetWatcher) {
      setError('budget', 'required', intl.get('todo.cards.form.required'))
    }
  }, [hasBudget, budgetWatcher])

  useEffect(() => {
    if (!hasBudget) {
      clearError('budget')
    }
  }, [hasBudget])

  useEffect(() => {
    if (modeWatcher === 'delayPast' && !startOffsetWatcher) {
      setError('start_offset.months', 'required', intl.get('todo.cards.form.required'))
    }
  }, [modeWatcher, startOffsetWatcher])

  useEffect(() => {
    if (modeWatcher !== 'delayPast') {
      clearError('start_offset.months')
    }
  }, [modeWatcher])

  useEffect(() => {
    if (
      resultWatcher &&
      coinsStepWatcher &&
      budgetWatcher &&
      !errors['adjustment.coins_step'] &&
      !errors['adjustment.result'] &&
      !errors.budget
    ) {
      todoGetAdjustmentConvertedBudgetTodoDelivery({
        result: parseFloat(resultWatcher),
        coins_step: normalizeFloat(coinsStepWatcher),
        maximum: normalizeFloat(budgetWatcher)
      })
    }
  }, [resultWatcher, coinsStepWatcher, errors, budgetWatcher])

  useEffect(() => {
    if (resultWatcher && coinsStepWatcher && !errors['adjustment.coins_step'] && !errors['adjustment.result']) {
      todoGetAdjustmentBudgetRateTodoDelivery({
        result: parseFloat(resultWatcher),
        coins_step: normalizeFloat(coinsStepWatcher)
      })
    }
  }, [resultWatcher, coinsStepWatcher, errors])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const handleDatePickerChange = useCallback((value, nameField) => {
    if (value) {
      setValue(nameField, value.format('M/D/YYYY'))
    }
  }, [])

  const validateGraterThenZero = value => {
    return value ? parseInt(value, 10) > 0 || intl.get('todo.cards.form.coinsField.minValueErrorMessage') : true
  }

  const validateGraterThenZeroForFloat = value => {
    return value ? parseFloat(value) > 0 || intl.get('todo.cards.form.coinsField.minValueErrorMessage') : true
  }

  const validateMaxLengthForFloat = value => {
    if (!value) {
      return true
    }
    const splitValue = value.toString().split('.')
    let valid = true
    if (splitValue.length > 1) {
      valid = splitValue[0].length <= 10 && splitValue[1].length <= 18
    } else {
      valid = splitValue[0].length <= 10
    }
    return valid || intl.get('todo.cards.form.coinsField.minValueErrorMessage')
  }

  return (
    <StyledForm>
      <WrappedText>
        <h1>{intl.get('todo.deliveries.form.header')}</h1>
        <Header>{intl.get('todo.deliveries.form.subHeader')}</Header>
      </WrappedText>
      <Form.Item label={intl.get('todo.deliveries.form.nameTitle')}>
        <WidgetRemaining value={remainingNameFieldValue} />
        <RHFInput
          as={<Input size='large' placeholder={intl.get('todo.deliveries.form.namePlaceholder')} disabled={isActive} />}
          name='name'
          rules={{
            required: intl.get('todo.cards.form.required'),
            maxLength: { value: 100, message: intl.get('todo.cards.form.nameField.maxLengthErrorMessage') }
          }}
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.name}
          mode='onChange'
          onKeyPress={event => {
            checkValueLength(event, 100)
          }}
        />
        <Error errors={errors} destination='name' />
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.todoCardTitle')}>
        <TodoCardsTableField
          register={register}
          unregister={unregister}
          setValue={setValue}
          name='card_id'
          isRequired
          requiredField='id'
          loading={isTodoCardsLoading}
          todoCards={todoCards}
          setHasBudget={setHasBudget}
          editItemActiveId={values.card_id}
          disabled={isActive}
        />
        <Error errors={errors} destination='card_id' />
      </Form.Item>
      <ConditionsWrapper isVisible={hasBudget}>
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
          <ConditionsWrapper isVisible={values && values.rewardAdjustmentActive}>
            <InputsWrapper>
              <FieldWrapper>
                <RHFInput
                  as={
                    <CustomInputNumber
                      size='large'
                      placeholder={intl.get('todo.deliveries.form.rewardsAdjustmentAmountTitle', { currency: 'AUD' })}
                    />
                  }
                  name='adjustment.result'
                  rules={{
                    validate: {
                      minValue: validateGraterThenZeroForFloat
                    }
                  }}
                  register={register}
                  unregister={unregister}
                  setValue={setValue}
                  defaultValue={values && values.adjustment && values.adjustment.result}
                  mode='onChange'
                />
                <Error errors={errors} destination='adjustment.result' />
              </FieldWrapper>
              <FieldWrapper>
                <RHFInput
                  as={
                    <CustomInputNumber
                      size='large'
                      placeholder={intl.get('todo.deliveries.form.rewardsAdjustmentStepTitle')}
                    />
                  }
                  name='adjustment.coins_step'
                  rules={{
                    validate: {
                      minValue: validateGraterThenZeroForFloat,
                      maxValue: validateMaxLengthForFloat
                    }
                  }}
                  register={register}
                  unregister={unregister}
                  setValue={setValue}
                  defaultValue={values && values.adjustment && values.adjustment.coins_step}
                  mode='onChange'
                />
                <Error errors={errors} destination='adjustment.coins_step' />
              </FieldWrapper>
            </InputsWrapper>
            <Header>{intl.get('todo.deliveries.form.rewardsSubtitle')}</Header>
            <Form.Item label={intl.get('todo.deliveries.form.coinsPerDeliveryTitle')}>
              <CustomInputNumber
                size='large'
                disabled
                placeholder={intl.get('todo.deliveries.form.coinsPerDeliveryPlaceholder')}
                value={points}
              />
            </Form.Item>
          </ConditionsWrapper>
        </Form.Item>
        <Form.Item label={intl.get('todo.deliveries.form.budgetTitle')}>
          <BudgetInputWrapper>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={isActive}
                  size='large'
                  placeholder={intl.get('todo.deliveries.form.budgetPlaceholder')}
                />
              }
              name='budget'
              rules={{
                validate: {
                  minValue: validateGraterThenZeroForFloat,
                  maxValue: validateMaxLengthForFloat
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.budget}
              mode='onChange'
            />
            {values && values.rewardAdjustmentActive && (
              <>
                <IconButton type='Exchange' />
                <span>{`${renderBudget ? `${renderBudget} AUD` : `${0} AUD`}`}</span>
              </>
            )}
          </BudgetInputWrapper>
          <Error errors={errors} destination='budget' />
          {values && values.rewardAdjustmentActive && (
            <Header>{intl.get('todo.deliveries.form.rewardsDailyMaximum')}</Header>
          )}
        </Form.Item>
      </ConditionsWrapper>
      <Form.Item label={intl.get('todo.deliveries.form.summaryDeliveryLabel')}>
        <RHFInput
          as={<RadioGroup group={RADIO_GROUP_MODE} disabled={isActive} />}
          name='mode'
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.mode}
        />
        <Error errors={errors} destination='mode' />
      </Form.Item>
      <ConditionsWrapper isVisible={values && values.mode === 'delayPast'}>
        <Form.Item>
          <InputWrapper>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={isActive}
                  size='large'
                  placeholder={intl.get('todo.deliveries.form.numberOfMonths')}
                />
              }
              name='start_offset.months'
              rules={{
                validate: {
                  minValue: validateGraterThenZero
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.start_offset && values.start_offset.months}
              mode='onChange'
            />
            <Error errors={errors} destination='start_offset.months' />
          </InputWrapper>
        </Form.Item>
      </ConditionsWrapper>
      <ConditionsWrapper isVisible={values && values.mode && values.mode !== 'immediate'}>
        <Form.Item label={intl.get('todo.deliveries.form.productsHeader')}>
          <RHFInput
            as={<RadioGroup disabled={isActive} group={RADIO_GROUP_PRODUCT} />}
            name='productRadio'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.productRadio}
          />
          <ConditionsWrapper isVisible={values && values.productRadio === 'choose'}>
            <ProductsTableField
              name='products'
              unregister={unregister}
              register={register}
              setValue={setValue}
              requiredField='barcode'
              values={values}
              disabled={isActive}
            />
          </ConditionsWrapper>
          <Error errors={errors} destination='productRadio' />
        </Form.Item>
      </ConditionsWrapper>
      <Form.Item label={intl.get('todo.deliveries.form.dateTitle')}>
        <RHFInput
          as={<RadioGroup disabled={isActive} group={RADIO_GROUP_DELIVERY_TIME} />}
          name='deliveryTiming'
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.deliveryTiming}
        />
        <ConditionsWrapper isVisible={values && values.deliveryTiming === 'setData'}>
          <PickersWrapper>
            <LocalDatePicker
              dateValue={values && values.start_date && moment(values.start_date, 'M/D/YYYY')}
              handleDatePickerChange={value => handleDatePickerChange(value, 'start_date')}
              placeholder={intl.get('trackAndTrace.inventory.startDate')}
              disabledDate={disabledDate}
            />
            <LocalDatePicker
              dateValue={values && values.end_date && moment(values.end_date, 'M/D/YYYY')}
              handleDatePickerChange={value => handleDatePickerChange(value, 'end_date')}
              placeholder={intl.get('trackAndTrace.inventory.endDate')}
              disabledDate={disabledDate}
            />
          </PickersWrapper>
        </ConditionsWrapper>
        <ConditionsWrapper isVisible={values && values.mode && values.mode !== 'immediate'}>
          <InputWrapper>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={isActive}
                  size='large'
                  placeholder={intl.get('todo.deliveries.form.matchingScansCountPlaceholder')}
                />
              }
              name='count'
              rules={{
                validate: {
                  minValue: validateGraterThenZero
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.count}
              mode='onChange'
            />
          </InputWrapper>
        </ConditionsWrapper>
        <Error errors={errors} destination='count' />
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.audienceTitle')}>
        <InputWrapper>
          <RHFInput
            as={
              <Select
                disabled={isActive}
                showSearch
                size='large'
                mode='multiple'
                getPopupContainer={trigger => trigger.parentNode}
                placeholder={intl.get('todo.deliveries.form.selectCountries')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {countries && countries.length && !isLoadingCountries
                  ? countries.map(country => (
                      <Option style={{ fontSize: 16 }} key={country.iso} value={country[name]}>
                        {country[name]}
                      </Option>
                    ))
                  : null}
              </Select>
            }
            name='audience.countries'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.audience && values.audience.countries}
          />
        </InputWrapper>
        <InputWrapper>
          <RHFInput
            as={
              <Select
                disabled={isActive}
                size='large'
                mode='multiple'
                getPopupContainer={trigger => trigger.parentNode}
                placeholder={intl.get('todo.deliveries.form.selectLanguages')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {languages && languages.length && !isLoadingLanguages
                  ? languages.map(language => (
                      <Option style={{ fontSize: 16 }} key={language.code} value={language[name]}>
                        {language[name]}
                      </Option>
                    ))
                  : null}
              </Select>
            }
            name='audience.languages'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.audience && values.audience.languages}
          />
        </InputWrapper>
        <InputWrapper>
          <RHFInput
            as={<RadioGroup disabled={isActive} group={RADIO_GROUP_GENDER} />}
            name='audience.gender'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.audience && values.audience.gender}
          />
        </InputWrapper>
        <SliderWrapper>
          <RHFInput
            as={<Slider disabled={isActive} tipFormatter={null} max={75} range marks={AGE_MARKS} step={null} />}
            name='audience.ageRange'
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={values && values.audience && values.audience.ageRange}
          />
        </SliderWrapper>
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.registrationTitle')}>
        <RHFInput
          as={<Checkbox.Group disabled={isActive} options={TYPE_REGISTRATION} />}
          name='audience.registration_methods'
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.audience && values.audience.registration_methods}
        />
        <Error errors={errors} destination='audience.registration_methods' />
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.weeklyScansTitle')}>
        <InputsWrapper>
          <FieldWrapper>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={isActive}
                  size='large'
                  placeholder={intl.get('todo.deliveries.form.weeklyScansFromPlaceholder')}
                />
              }
              name='audience.weekly_scans.from'
              rules={{
                validate: {
                  minValue: validateGraterThenZero
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              mode='onChange'
              defaultValue={
                values && values.audience && values.audience.weekly_scans && values.audience.weekly_scans.from
              }
            />
            <Error errors={errors} destination='audience.weekly_scans.from' />
          </FieldWrapper>
          <FieldWrapper>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={isActive}
                  size='large'
                  placeholder={intl.get('todo.deliveries.form.weeklyScansToPlaceholder')}
                />
              }
              name='audience.weekly_scans.to'
              rules={{
                validate: {
                  minValue: validateGraterThenZero
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              mode='onChange'
              defaultValue={
                values && values.audience && values.audience.weekly_scans && values.audience.weekly_scans.to
              }
            />
            <Error errors={errors} destination='audience.weekly_scans.to' />
          </FieldWrapper>
        </InputsWrapper>
      </Form.Item>
      <Form.Item label={intl.get('todo.deliveries.form.scannedCountriesTitle')}>
        <RHFInput
          as={
            <Select
              disabled={isActive}
              showSearch
              size='large'
              mode='multiple'
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={intl.get('todo.deliveries.form.selectCountries')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {countries && countries.length && !isLoadingCountries
                ? countries.map(country => (
                    <Option style={{ fontSize: 16 }} key={country.iso} value={country[name]}>
                      {country[name]}
                    </Option>
                  ))
                : null}
            </Select>
          }
          name='audience.scan_countries'
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.audience && values.audience.scan_countries}
        />
        <Error errors={errors} destination='audience.scan_countries' />
      </Form.Item>
    </StyledForm>
  )
}

TodoDeliveryEditor.propTypes = {
  todoCards: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  watch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  clearError: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isTodoCardsLoading: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  name: PropTypes.string.isRequired,
  points: PropTypes.string,
  convertedBudget: PropTypes.number,
  todoGetAdjustmentConvertedBudgetTodoDelivery: PropTypes.func.isRequired,
  todoGetAdjustmentBudgetRateTodoDelivery: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

TodoDeliveryEditor.defaultProps = {
  errors: {},
  isTodoCardsLoading: false,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  todoCards: [],
  languages: [],
  countries: [],
  points: null,
  convertedBudget: null
}

export default withRouter(TodoDeliveryEditor)
