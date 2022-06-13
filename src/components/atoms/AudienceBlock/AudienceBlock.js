import React, { useCallback, useEffect } from 'react'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Checkbox, Form, Select, Slider } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as ST from './styles'
import { validateGraterThenZero } from '../../../utils/validation'
import { name } from '../../../utils/consts'
import RadioGroup from '../RadioGroup'
import { AGE_MARKS, RADIO_GROUP_GENDER, TYPE_REGISTRATION } from '../../pages/TodoDeliveryEditor/consts'
import Error from '../Error'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import LocalDatePicker from '../LocalDatePicker'

const { Option } = Select

const AudienceBlock = ({
  values,
  countries,
  languages,
  setValue,
  register,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  isAdvancedFields,
  errors,
  isReadOnly
}) => {
  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    if (isAdvancedFields) {
      register({ name: 'audience.scan_date' })
    }
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

  return (
    <Form.Item label={intl.get('todo.deliveries.form.audienceTitle')}>
      <ST.InputWrapper>
        <RHFInput
          as={
            <Select
              disabled={isReadOnly}
              showSearch
              size='large'
              mode='multiple'
              getPopupContainer={trigger => trigger.parentNode}
              loading={isLoadingCountries}
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
          setValue={setValue}
          defaultValue={(values && values.audience && values.audience.countries) || []}
        />
      </ST.InputWrapper>
      <ST.InputWrapper>
        <RHFInput
          as={
            <Select
              disabled={isReadOnly}
              size='large'
              mode='multiple'
              loading={isLoadingLanguages}
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
          setValue={setValue}
          defaultValue={(values && values.audience && values.audience.languages) || []}
        />
      </ST.InputWrapper>
      <ST.InputWrapper>
        <RHFInput
          as={<RadioGroup group={RADIO_GROUP_GENDER} />}
          disabled={isReadOnly}
          name='audience.gender'
          register={register}
          setValue={setValue}
          defaultValue={values && values.audience && values.audience.gender}
        />
      </ST.InputWrapper>
      <ST.SliderWrapper>
        <RHFInput
          as={<Slider tipFormatter={null} max={75} range marks={AGE_MARKS} step={null} />}
          disabled={isReadOnly}
          name='audience.ageRange'
          register={register}
          setValue={setValue}
          defaultValue={(values && values.audience && values.audience.ageRange) || []}
        />
      </ST.SliderWrapper>
      {isAdvancedFields && (
        <>
          <ST.WeeklyScansBlock>
            <Form.Item label={intl.get('campaigns.bot.form.lastScanDateTitle')}>
              <LocalDatePicker
                dateValue={
                  values &&
                  values.audience &&
                  values.audience.scan_date &&
                  moment(values.audience.scan_date, 'M/D/YYYY')
                }
                handleDatePickerChange={value => handleDatePickerChange(value, 'audience.scan_date')}
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label={intl.get('todo.deliveries.form.weeklyScansTitle')}>
              <ST.InputsWrapper>
                <ST.FieldWrapper>
                  <RHFInput
                    as={
                      <CustomInputNumber
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
                    setValue={setValue}
                    mode='onChange'
                    defaultValue={
                      values && values.audience && values.audience.weekly_scans && values.audience.weekly_scans.from
                    }
                  />
                  <Error errors={errors} destination='audience.weekly_scans.from' />
                </ST.FieldWrapper>
                <ST.FieldWrapper>
                  <RHFInput
                    as={
                      <CustomInputNumber
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
                    setValue={setValue}
                    mode='onChange'
                    defaultValue={
                      values && values.audience && values.audience.weekly_scans && values.audience.weekly_scans.to
                    }
                  />
                  <Error errors={errors} destination='audience.weekly_scans.to' />
                </ST.FieldWrapper>
              </ST.InputsWrapper>
            </Form.Item>
          </ST.WeeklyScansBlock>
          <Form.Item label={intl.get('todo.deliveries.form.scannedCountriesTitle')}>
            <RHFInput
              as={
                <Select
                  showSearch
                  size='large'
                  loading={isLoadingCountries}
                  mode='multiple'
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder={intl.get('todo.deliveries.form.selectCountries')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
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
              setValue={setValue}
              defaultValue={(values && values.audience && values.audience.scan_countries) || []}
            />
            <Error errors={errors} destination='audience.scan_countries' />
          </Form.Item>
          <Form.Item label={intl.get('todo.deliveries.form.registrationTitle')}>
            <RHFInput
              as={<Checkbox.Group options={TYPE_REGISTRATION} />}
              name='audience.registration_methods'
              register={register}
              setValue={setValue}
              defaultValue={values && values.audience && values.audience.registration_methods}
            />
            <Error errors={errors} destination='audience.registration_methods' />
          </Form.Item>
        </>
      )}
    </Form.Item>
  )
}

AudienceBlock.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  isAdvancedFields: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object
}

AudienceBlock.defaultProps = {
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  isAdvancedFields: false,
  errors: null,
  isReadOnly: false
}

export default AudienceBlock
