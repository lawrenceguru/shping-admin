import React, { useEffect, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Input, Tooltip } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import moment from 'moment'
import * as ST from './styles'
import Error from '../../atoms/Error'
import SwitchOption from '../../atoms/SwitchOption'
import RadioGroup from '../../atoms/RadioGroup'
import { RADIO_GROUP_DELIVERY_TIME } from '../../pages/TodoDeliveryEditor/consts'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import IconButton from '../../molecules/IconButton'

const CampaignsShoutoutsStepsSettings = ({ values, setValue, register, errors, setIsSubmit, triggerValidation }) => {
  useEffect(() => {
    register({ name: 'start_date' })
    register({ name: 'end_date' })
  }, [])

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(isValidate => {
            resolve(isValidate)
          })
        })
    })
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
    <>
      <ST.StyledForm>
        <Form.Item label={intl.get('campaigns.shoutouts.form.nameTitle')} style={{ marginBottom: '30px' }}>
          <ST.FieldsWrapper>
            <ST.Field>
              <RHFInput
                as={<Input size='large' placeholder={intl.get('campaigns.shoutouts.form.namePlaceholder')} />}
                name='name'
                rules={{
                  required: intl.get('todo.cards.form.required'),
                  minLength: { value: 3, message: intl.get('todo.cards.form.nameField.minLengthErrorMessage') }
                }}
                register={register}
                setValue={setValue}
                defaultValue={values && values.name}
                mode='onChange'
              />
              <Error errors={errors} destination='name' />
            </ST.Field>
            <ST.SwitchWrapper>
              <RHFInput
                as={
                  <SwitchOption
                    text={intl.get(
                      values && values.status
                        ? 'todo.deliveries.form.rewardsAdjustmentActive'
                        : 'todo.deliveries.form.rewardsAdjustmentInactive'
                    )}
                    checked={!!(values && values.status)}
                  />
                }
                name='status'
                register={register}
                setValue={setValue}
                defaultValue={values && values.status}
              />
            </ST.SwitchWrapper>
          </ST.FieldsWrapper>
        </Form.Item>
        <Form.Item label={intl.get('campaigns.shoutouts.form.pushMessageTitle')} style={{ marginBottom: '30px' }}>
          <RHFInput
            as={<Input size='large' placeholder={intl.get('campaigns.shoutouts.form.pushMessageTitle')} />}
            name='copy'
            rules={{
              required: intl.get('todo.cards.form.required'),
              minLength: { value: 3, message: intl.get('campaigns.shoutouts.form.validation.pushMessageMinLength') },
              maxLength: { value: 110, message: intl.get('campaigns.shoutouts.form.validation.pushMessageMaxLength') }
            }}
            register={register}
            setValue={setValue}
            defaultValue={values && values.copy}
            mode='onChange'
          />
          <Error errors={errors} destination='copy' />
        </Form.Item>
        <Form.Item>
          <ST.FieldsWrapper>
            <ST.FieldWrapper>
              <RHFInput
                as={
                  <CustomInputNumber placeholder={intl.get('campaigns.shoutouts.form.pushMessageDelayPlaceholder')} />
                }
                name='delay'
                register={register}
                setValue={setValue}
                defaultValue={values && values.delay}
              />
              <Tooltip title={intl.get('campaigns.shoutouts.form.pushMessageDelayTooltip')}>
                <div>
                  <IconButton
                    type='InfoCircle'
                    styleParam={{ color: '#ff4d4f', fontSize: '15px', cursor: 'default', marginLeft: '7px' }}
                  />
                </div>
              </Tooltip>
            </ST.FieldWrapper>
            <ST.FieldWrapper>
              <RHFInput
                as={
                  <CustomInputNumber
                    placeholder={intl.get('campaigns.shoutouts.form.matchingCampaignCountPlaceholder')}
                  />
                }
                name='count'
                register={register}
                setValue={setValue}
                defaultValue={values && values.count}
              />
              <Tooltip title={intl.get('campaigns.shoutouts.form.matchingCampaignCountTooltip')}>
                <div>
                  <IconButton
                    type='InfoCircle'
                    styleParam={{ color: '#ff4d4f', fontSize: '15px', cursor: 'default', marginLeft: '7px' }}
                  />
                </div>
              </Tooltip>
            </ST.FieldWrapper>
          </ST.FieldsWrapper>
        </Form.Item>
        <Form.Item label={intl.get('campaigns.shoutouts.form.timingTitle')}>
          <RHFInput
            as={<RadioGroup group={RADIO_GROUP_DELIVERY_TIME} />}
            name='shoutoutTiming'
            register={register}
            setValue={setValue}
            defaultValue={values && values.shoutoutTiming}
          />
          <ST.ConditionsWrapper isVisible={values && values.shoutoutTiming === 'setData'}>
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
      </ST.StyledForm>
    </>
  )
}

CampaignsShoutoutsStepsSettings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired
}

CampaignsShoutoutsStepsSettings.defaultProps = {
  values: null,
  errors: null
}

export default CampaignsShoutoutsStepsSettings
