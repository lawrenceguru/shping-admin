import React, { useCallback, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Form, Input, DatePicker } from 'antd'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { boostMethodOptions } from './consts'
import Error from '../../atoms/Error'
import * as ST from './styles'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import RadioGroup from '../../atoms/RadioGroup'

const { RangePicker } = DatePicker

const CampaignsBoostStepSettings = ({
  register,
  setIsSubmit,
  triggerValidation,
  values,
  setValue,
  errors,
  watch,
  clearError
}) => {
  useEffect(() => {
    register({ name: 'start_date' })
    register({ name: 'end_date' }, { required: intl.get('todo.cards.form.required') })
    register({ name: 'stop_date' })
  }, [])

  const endDateWatcher = watch('end_date')

  useEffect(() => {
    if (endDateWatcher && errors.end_date) {
      clearError('end_date')
    }
  }, [endDateWatcher])

  const handleRangePicker = useCallback(data => {
    if (data) {
      if (data[0] && data[1]) {
        setValue('start_date', moment(data[0]).format('M/D/YYYY'))
        setValue('end_date', moment(data[1]).format('M/D/YYYY'))
      }
    } else {
      setValue('start_date', '')
      setValue('end_date', '')
    }
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

  const handleDatePickerChange = useCallback(value => {
    if (value) {
      setValue('stop_date', value.format('M/D/YYYY'))
    } else {
      setValue('stop_date', '')
    }
  }, [])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  return (
    <ST.StyledForm>
      <Form.Item label={intl.get('campaigns.boost.settings.nameHeader')}>
        <RHFInput
          as={
            <Input
              disabled={!!(values && values.isReadOnly)}
              size='large'
              placeholder={intl.get('campaigns.boost.settings.namePlaceholder')}
            />
          }
          name='name'
          rules={{
            required: intl.get('todo.cards.form.required')
          }}
          register={register}
          setValue={setValue}
          defaultValue={values && values.name}
          mode='onChange'
        />
        <Error errors={errors} destination='name' />
      </Form.Item>
      <ST.PickersWrapper>
        <Form.Item label={intl.get('campaigns.boost.settings.dateHeader')}>
          <RangePicker
            disabled={!!(values && values.isReadOnly)}
            size='large'
            // allowClear={false}
            // disabledDate={disabledDate}
            value={
              values && [
                values.start_date && moment(values.start_date, 'M/D/YYYY'),
                values.end_date && moment(values.end_date, 'M/D/YYYY')
              ]
            }
            defaultValue={
              values && [
                values.start_date && moment(values.start_date, 'M/D/YYYY'),
                values.end_date && moment(values.end_date, 'M/D/YYYY')
              ]
            }
            // locale={{
            //   lang: {
            //     rangePlaceholder: [
            //       intl.get('trackAndTrace.inventory.startDate'),
            //       intl.get('trackAndTrace.inventory.endDate')
            //     ],
            //     yearFormat: 'YYYY',
            //     dateFormat: 'D/MM/YYYY',
            //     dayFormat: 'DD'
            //   }
            // }}
            onChange={handleRangePicker}
          />
          <Error errors={errors} destination='end_date' />
        </Form.Item>
        <Form.Item label={intl.get('campaigns.boost.settings.stopDateHeader')}>
          <LocalDatePicker
            disabled={!!(values && values.isReadOnly)}
            dateValue={values && values.stop_date && moment(values.stop_date, 'M/D/YYYY')}
            handleDatePickerChange={handleDatePickerChange}
            placeholder={intl.get(`selectDate`)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </ST.PickersWrapper>
      <Form.Item label={intl.get('campaigns.boost.settings.limitHeader')}>
        <RHFInput
          as={
            <CustomInputNumber
              isSelectsDisable={!!(values && values.isReadOnly)}
              size='large'
              placeholder={intl.get('campaigns.boost.settings.limitPlaceholder')}
            />
          }
          name='limit'
          register={register}
          setValue={setValue}
          defaultValue={values && values.limit}
          mode='onChange'
        />
        <Error errors={errors} destination='limit' />
      </Form.Item>
      <Form.Item>
        <RHFInput
          as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostMethodOptions} size='large' />}
          name='method'
          register={register}
          setValue={setValue}
          defaultValue={values && values.method}
          mode='onChange'
        />
        <Error errors={errors} destination='method' />
      </Form.Item>
    </ST.StyledForm>
  )
}

CampaignsBoostStepSettings.propTypes = {
  register: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  watch: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
}

CampaignsBoostStepSettings.defaultProps = {
  values: null,
  errors: null
}

export default CampaignsBoostStepSettings
