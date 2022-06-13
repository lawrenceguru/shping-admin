import React, { useEffect, useCallback } from 'react'
import { Checkbox, Form, Select, DatePicker, TimePicker, Input } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import { RHFInput } from 'react-hook-form-input'
import * as ST from './styles'
import SwitchOption from '../../atoms/SwitchOption'
import Error from '../../atoms/Error'
import { getValueFromName } from '../../../utils/calculations'
import GtinSelect from '../../molecules/GtinSelect'
import CountrySelect from '../../molecules/CountrySelect'
import AudienceBlock from '../../atoms/AudienceBlock'
import { getDatePickerLocale, getMomentLocale } from '../../../utils/helpers/date'
import UsersSelect from '../../molecules/UsersSelect'
import AddSingleImageWidget from '../../atoms/AddSingleImageWidget'

moment.locale(getMomentLocale())

const { RangePicker } = DatePicker
const { Group } = Checkbox

const CustomForm = ({
  register,
  clearError,
  setError,
  errors,
  setValue,
  values,
  setIsSubmit,
  triggerValidation,
  fields
}) => {
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

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const generateField = useCallback(
    field => {
      const { placeholder, name, type, label, rules } = field

      const val = getValueFromName(name, values)
      if (['checkbox', 'switch', 'timePicker', 'rangePicker'].includes(type)) {
        register({ name, type: 'custom' }, rules)
      }

      switch (type) {
        case 'switch':
          return (
            <Form.Item label={label}>
              <SwitchOption
                textMarginLeft='0px'
                text={placeholder}
                justifyContent='flex-start'
                checked={val}
                onChange={value => {
                  register({ name })
                  setValue(name, value)
                }}
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'checkbox':
          return (
            <Checkbox
              size='large'
              defaultChecked={val}
              checked={val}
              onChange={event => {
                register({ name })
                setValue(name, event.target.checked)
              }}
            >
              {placeholder}
            </Checkbox>
          )
        case 'input':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={<Input size='large' placeholder={placeholder} />}
                name={name}
                register={register}
                rules={rules}
                setValue={setValue}
                defaultValue={val}
                mode='onChange'
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'rangePicker':
          return (
            <Form.Item label={label}>
              <RangePicker
                size='large'
                // allowClear={false}
                disabledDate={field.disabledDate || disabledDate}
                placeholder={[
                  intl.get('campaigns.featured.settings.startDatePlaceholder'),
                  intl.get('campaigns.featured.settings.endDatePlaceholder')
                ]}
                defaultValue={(val && val.length && [moment(val[0]), moment(val[1])]) || []}
                value={(val && val.length && [moment(val[0]), moment(val[1])]) || []}
                locale={getDatePickerLocale()}
                onChange={(data, dateStrings) => {
                  if (data) {
                    if (dateStrings[0] && dateStrings[1]) {
                      setValue(name, [dateStrings[0], dateStrings[1]])
                    }
                  } else {
                    setValue(name, '', '')
                  }
                }}
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'timePicker':
          return (
            <Form.Item label={label}>
              <TimePicker
                use12Hours
                size='large'
                style={{ width: '100%' }}
                locale={getDatePickerLocale()}
                placeholder={intl.get('campaigns.featured.settings.selectTimePlaceholder')}
                format='h A'
                value={(val && moment(val, 'h:mm A')) || null}
                onChange={value => {
                  if (value) {
                    setValue(name, value.set('minute', 0).format('h:mm A'))
                  } else {
                    setValue(name, '')
                  }
                }}
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'tags':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={
                  <Select
                    mode='tags'
                    getPopupContainer={trigger => trigger.parentNode}
                    style={{ width: '100%' }}
                    size='large'
                    placeholder={intl.get('common.inputPlaceholder')}
                  />
                }
                name={name}
                rules={rules}
                register={register}
                setValue={setValue}
                defaultValue={val || []}
                mode='onChange'
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'products':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={
                  <GtinSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    style={{ width: '100%' }}
                    size='large'
                    placeholder={placeholder}
                  />
                }
                name={name}
                rules={rules}
                register={register}
                setValue={setValue}
                defaultValue={val || []}
                mode='onChange'
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'countries':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={
                  <CountrySelect
                    getPopupContainer={trigger => trigger.parentNode}
                    style={{ width: '100%' }}
                    size='large'
                    placeholder={placeholder}
                  />
                }
                name={name}
                rules={rules}
                register={register}
                setValue={setValue}
                defaultValue={val || []}
                mode='onChange'
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'users':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={
                  <UsersSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    style={{ width: '100%' }}
                    size='large'
                    placeholder={placeholder}
                  />
                }
                name={name}
                rules={rules}
                register={register}
                setValue={setValue}
                defaultValue={val || []}
                mode='onChange'
              />
              <Error destination={name} errors={errors} />
            </Form.Item>
          )
        case 'audience':
          return <AudienceBlock values={values} setValue={setValue} register={register} errors={errors} />
        case 'grouped':
          return (
            <Form.Item label={label}>
              <RHFInput
                as={<Group options={field.options} />}
                name={name}
                rules={rules}
                setValue={setValue}
                register={register}
                defaultValue={val || []}
              />
            </Form.Item>
          )
        case 'singleImage':
          return (
            <AddSingleImageWidget
              setValue={setValue}
              clearError={clearError}
              name={name}
              values={values}
              errors={errors}
              setError={setError}
              register={register}
              headerText={label}
            />
          )
        default:
          return null
      }
    },
    [values]
  )

  return (
    <ST.StyledForm>
      {fields &&
        fields &&
        fields.length !== 0 &&
        fields.map((elem, index) => {
          if (Array.isArray(elem)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <ST.FieldsWrapper key={index}>
                {elem.map(item => (
                  <ST.Field key={item.name} justify={item.justify} flexBasis={item.basis}>
                    {generateField(item)}
                  </ST.Field>
                ))}
              </ST.FieldsWrapper>
            )
          }
          return <div key={elem.name}>{generateField(elem)}</div>
        })}
    </ST.StyledForm>
  )
}

CustomForm.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  clearError: PropTypes.func,
  setError: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array]))
}

CustomForm.defaultProps = {
  errors: {},
  values: {},
  clearError: null,
  setError: null,
  fields: null
}

export default CustomForm
