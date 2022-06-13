import React, { useCallback, useEffect, useMemo } from 'react'
import { Checkbox, Form, Input, Select, TimePicker } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import moment from 'moment'
import Error from '../../atoms/Error'
import * as ST from './styles'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import RadioGroup from '../../atoms/RadioGroup'
import { reminderFrequencies, reminderCustomDays } from './consts'
import { name } from '../../../utils/consts'
import IconButton from '../../molecules/IconButton'
import Button from '../../atoms/Button'
import WidgetRemaining from '../../atoms/WidgetRemaining'

const { Option } = Select
const { TextArea } = Input

const CampaignsReminderStepsSettings = ({
  register,
  setIsSubmit,
  triggerValidation,
  values,
  setValue,
  errors,
  watch,
  clearError,
  unregister,
  languages,
  isLoadingLanguages,
  settingsGetLanguages
}) => {
  useEffect(() => {
    register({ name: 'run_options.start_date' }, { required: intl.get('todo.cards.form.required') })
    register({ name: 'run_options.start_time' }, { required: intl.get('todo.cards.form.required') })
  }, [])

  const remainingAnswerSize = useMemo(() => {
    if (values && values.messages) {
      const remainingSizes = []
      values.messages.forEach(message => {
        remainingSizes.push(500 - ((message && message.text && message.text.length) || 0))
      })
      return remainingSizes
    }
    return []
  }, [values])

  const startDateWatcher = watch('run_options.start_date')
  const startTimeWatcher = watch('run_options.start_time')
  const frequencyWatcher = watch('run_options.frequency')

  useEffect(() => {
    if (startDateWatcher && errors['run_options.start_date']) {
      clearError('run_options.start_date')
    }
  }, [startDateWatcher])

  useEffect(() => {
    if (startTimeWatcher && errors['run_options.start_time']) {
      clearError('run_options.start_time')
    }
  }, [startTimeWatcher])

  useEffect(() => {
    if (frequencyWatcher !== 'custom' && errors.customDays) {
      clearError('customDays')
    }
  }, [frequencyWatcher])

  useEffect(() => {
    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

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
      setValue('run_options.start_date', value.format('M/D/YYYY'))
    } else {
      setValue('run_options.start_date', '')
    }
  }, [])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const onChangeTimePicker = useCallback(
    value => {
      if (value) {
        setValue('run_options.start_time', value.set('minute', 0).format('h:mm A'))
      } else {
        setValue('run_options.start_time', '')
      }
    },
    [moment]
  )

  const handleDeleteTitle = index => {
    if (values.messages) {
      const currTitles = values.messages.filter((item, indexItem) => indexItem !== index)

      unregister(`messages[${currTitles.length}].text`)
      unregister(`messages[${currTitles.length}].language`)
      unregister(`messages[${currTitles.length}]`)

      setValue('messages', [])

      currTitles.forEach((item, indexItem) => {
        setValue(`messages[${indexItem}].text`, item.text)
        setValue(`messages[${indexItem}].language`, item.language)
      })
    }
  }

  const handleAddTitle = () => {
    const currLength = (values && values.messages && values.messages.length) || 0
    register({ name: `messages[${currLength}]` })
    setValue(`messages[${currLength}]`, { text: '', language: undefined })
  }

  return (
    <ST.StyledForm>
      <Form.Item label={intl.get('campaigns.reminder.settings.nameHeader')}>
        <RHFInput
          as={
            <Input
              disabled={!!(values && values.isReadOnly)}
              size='large'
              placeholder={intl.get('campaigns.reminder.settings.namePlaceholder')}
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
        <Form.Item label={intl.get('campaigns.reminder.settings.dateHeader')}>
          <LocalDatePicker
            disabled={!!(values && values.isReadOnly)}
            dateValue={
              values &&
              values.run_options &&
              values.run_options.start_date &&
              moment(values.run_options.start_date, 'M/D/YYYY')
            }
            handleDatePickerChange={handleDatePickerChange}
            placeholder={intl.get(`selectDate`)}
            disabledDate={disabledDate}
          />
          <Error errors={errors} destination='run_options.start_date' />
        </Form.Item>
        <Form.Item label={intl.get('campaigns.reminder.settings.timeHeader')}>
          <TimePicker
            use12Hours
            format='h A'
            value={
              (values &&
                values.run_options &&
                values.run_options.start_time &&
                moment(values.run_options.start_time, 'h:mm A')) ||
              null
            }
            onChange={onChangeTimePicker}
          />
          <Error errors={errors} destination='run_options.start_time' />
        </Form.Item>
      </ST.PickersWrapper>
      <Form.Item label={intl.get('campaigns.reminder.settings.frequencyHeader')}>
        <RHFInput
          as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={reminderFrequencies} size='large' />}
          name='run_options.frequency'
          register={register}
          setValue={setValue}
          defaultValue={values && values.run_options && values.run_options.frequency}
          mode='onChange'
        />
        <Error errors={errors} destination='run_options.frequency' />
      </Form.Item>
      {values && values.run_options && values.run_options.frequency === 'custom' && (
        <Form.Item label={intl.get('campaigns.reminder.settings.customDaysHeader')}>
          <RHFInput
            as={<Checkbox.Group disabled={!!values.isReadOnly} options={reminderCustomDays} />}
            name='customDays'
            rules={{
              validate: value => (value && value.length ? true : intl.get('todo.cards.form.required'))
            }}
            register={register}
            setValue={setValue}
            defaultValue={(values && values.customDays) || []}
            mode='onChange'
          />
          <Error errors={errors} destination='customDays' />
        </Form.Item>
      )}
      <Form.Item label={intl.get('campaigns.reminder.settings.messageHeader')}>
        <Form.Item label={intl.get('documents.form.title', { language: intl.get('documents.form.english') })}>
          <WidgetRemaining value={remainingAnswerSize[0]} />
          <RHFInput
            as={<TextArea rows={6} size='large' />}
            rules={{ required: intl.get('todo.cards.form.required') }}
            name='messages[0].text'
            register={register}
            setValue={setValue}
            defaultValue={values && values.messages && values.messages[0] && values.messages[0].text}
            mode='onChange'
          />
          <Error errors={errors} destination='messages[0].text' />
        </Form.Item>
      </Form.Item>
      {!!(values && values.messages && values.messages.length > 1) &&
        values.messages.map((item, index) =>
          index !== 0 ? (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`item-${index}`}>
              <Form.Item label={intl.get('documents.form.language')}>
                <RHFInput
                  as={
                    <Select
                      size='large'
                      showSearch
                      loading={isLoadingLanguages}
                      getPopupContainer={trigger => trigger.parentNode}
                      placeholder={intl.get('todo.deliveries.form.selectLanguages')}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
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
                  name={`messages[${index}].language`}
                  rules={{ required: intl.get('todo.cards.form.required') }}
                  register={register}
                  unregister={unregister}
                  setValue={setValue}
                  defaultValue={values && values.messages && values.messages[index] && values.messages[index].language}
                  mode='onChange'
                />
                <Error errors={errors} destination={`messages[${index}].language`} />
              </Form.Item>
              <Form.Item
                label={intl.get('documents.form.title', {
                  language: values && values.messages && values.messages[index] && values.messages[index].language
                })}
              >
                <ST.TitleFieldWrapper>
                  <ST.TitleTextWrapper>
                    <WidgetRemaining value={remainingAnswerSize[index]} />
                    <RHFInput
                      as={<TextArea rows={6} size='large' />}
                      rules={{ required: intl.get('todo.cards.form.required') }}
                      name={`messages[${index}].text`}
                      register={register}
                      unregister={unregister}
                      setValue={setValue}
                      defaultValue={values && values.messages && values.messages[index] && values.messages[index].text}
                      mode='onChange'
                    />
                  </ST.TitleTextWrapper>
                  <IconButton
                    type='Delete'
                    popText={intl.get('documents.form.deleteTitle')}
                    actionFunction={() => handleDeleteTitle(index)}
                  />
                </ST.TitleFieldWrapper>
                <Error errors={errors} destination={`messages[${index}].text`} />
              </Form.Item>
            </div>
          ) : null
        )}
      <ST.ButtonWrapper>
        <Button type='danger' onClick={handleAddTitle}>
          {intl.get('documents.form.addLanguage')}
        </Button>
      </ST.ButtonWrapper>
    </ST.StyledForm>
  )
}

CampaignsReminderStepsSettings.propTypes = {
  register: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  watch: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  settingsGetLanguages: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired
}

CampaignsReminderStepsSettings.defaultProps = {
  values: null,
  errors: null,
  isLoadingLanguages: false,
  languages: []
}

export default CampaignsReminderStepsSettings
