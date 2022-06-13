import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import CustomSelect from '../CustomSelect'

const { Option } = Select

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 100%;
    margin-right: 20px;
  }
`

const SerializationSourceWidget = ({
  register,
  setValue,
  values,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  isSelectsDisable
}) => {
  useEffect(() => {
    if (!countries || !countries.length) {
      settingsGetCountries()
    }
    if (!languages || !languages.length) {
      settingsGetLanguages()
    }
  }, [])

  const name = localStorage.getItem('lang') === 'en' ? 'name' : `name_${localStorage.getItem('lang')}`

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('serializationTasks.serializationStep.fourthStep.source')}
      smallSize
      maxWidth='100%'
    >
      <FieldsWrapper>
        <Form.Item label={intl.get('serializationTasks.serializationStep.fourthStep.restrictionLanguage')}>
          <CustomSelect
            mode='multiple'
            loading={isLoadingLanguages}
            value={
              languages &&
              languages.length &&
              values &&
              values.source &&
              values.source.conditions.language &&
              values.source.conditions.language.map(el =>
                languages.find(elObj => elObj.code === el) ? languages.find(elObj => elObj.code === el)[name] : null
              )
            }
            disabled={isSelectsDisable}
            handleValueChange={valuess => {
              const newSources = { ...values.source }
              const newValues = valuess.map(el => languages.find(language => language[name] === el).code)
              // eslint-disable-next-line no-unused-expressions
              newValues && newValues.length
                ? (newSources.conditions.language = newValues)
                : delete newSources.conditions.language
              setValue(`source`, newSources)
            }}
            register={register}
          >
            {languages && !isLoadingLanguages
              ? languages.map(language => (
                  <Option style={{ fontSize: 16 }} key={language.code} value={language[name]}>
                    {language[name]}
                  </Option>
                ))
              : null}
          </CustomSelect>
        </Form.Item>
        <Form.Item label={intl.get('serializationTasks.serializationStep.fourthStep.restrictionCountry')}>
          <CustomSelect
            mode='multiple'
            loading={isLoadingCountries}
            value={
              countries &&
              countries.length &&
              values &&
              values.source &&
              values.source.conditions.country &&
              values.source.conditions.country.map(el =>
                countries.find(elObj => elObj.iso === el) ? countries.find(elObj => elObj.iso === el)[name] : null
              )
            }
            disabled={isSelectsDisable}
            handleValueChange={valuess => {
              const newSources = { ...values.source }
              const newValues = valuess.map(el => countries.find(country => country[name] === el).iso)
              // eslint-disable-next-line no-unused-expressions
              newValues && newValues.length
                ? (newSources.conditions.country = newValues)
                : delete newSources.conditions.country
              setValue(`source`, newSources)
            }}
            register={register}
          >
            {countries && !isLoadingCountries
              ? countries.map(country => (
                  <Option style={{ fontSize: 16 }} key={country.iso} value={country[name]}>
                    {country[name]}
                  </Option>
                ))
              : null}
          </CustomSelect>
        </Form.Item>
      </FieldsWrapper>
    </ProductEditWidgetWrapper>
  )
}

SerializationSourceWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  isSelectsDisable: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  values: PropTypes.object
}

SerializationSourceWidget.defaultProps = {
  countries: [],
  languages: [],
  isLoadingLanguages: undefined,
  isLoadingCountries: undefined,
  isSelectsDisable: false
}

export default SerializationSourceWidget
