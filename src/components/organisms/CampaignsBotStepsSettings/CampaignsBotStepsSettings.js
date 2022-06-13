import React, { useEffect, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import moment from 'moment'
import * as ST from './styles'
import InformationPanel from '../../atoms/InformationPanel'
import Error from '../../atoms/Error'
import SwitchOption from '../../atoms/SwitchOption'
import RadioGroup from '../../atoms/RadioGroup'
import { RADIO_GROUP_DELIVERY_TIME } from '../../pages/TodoDeliveryEditor/consts'
import LocalDatePicker from '../../atoms/LocalDatePicker'
// import AudienceBlock from '../../atoms/AudienceBlock'

const CampaignsBotStepsSettings = ({ values, setValue, register, errors, setIsSubmit, triggerValidation }) => {
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
      <InformationPanel
        header={intl.get('campaigns.bot.form.panelHeader')}
        content={intl.get('campaigns.bot.form.panelBody')}
      />
      <ST.StyledForm>
        <Form.Item label={intl.get('campaigns.bot.form.nameTitle')}>
          <ST.FieldsWrapper>
            <ST.Field>
              <RHFInput
                as={<Input size='large' placeholder={intl.get('campaigns.bot.form.namePlaceholder')} />}
                name='name'
                rules={{ required: intl.get('todo.cards.form.required') }}
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
        <Form.Item label={intl.get('campaigns.bot.form.timingTitle')}>
          <RHFInput
            as={<RadioGroup group={RADIO_GROUP_DELIVERY_TIME} />}
            name='botTiming'
            register={register}
            setValue={setValue}
            defaultValue={values && values.botTiming}
          />
          <ST.ConditionsWrapper isVisible={values && values.botTiming === 'setData'}>
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

CampaignsBotStepsSettings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired
}

CampaignsBotStepsSettings.defaultProps = {
  values: null,
  errors: null
}

export default CampaignsBotStepsSettings
