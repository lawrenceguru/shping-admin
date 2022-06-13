import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import uuid from 'uuid4'
import { uniqWith, isEqual, isEmpty } from 'lodash'
import IconButton from '../../molecules/IconButton'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import deleteModal from '../../molecules/DeleteModal'
import { StyledError } from '../ProductEditInfoWidget/styles'
import { HeaderPanel, ButtonsPanel, TypeImage } from './styles'
import { destroyReferenceDependence } from '../../../utils/destroyReferenceDependence'

const { Option } = Select

const ProductEditSourceWidget = ({
  setValue,
  errors,
  setError,
  clearError,
  sources,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  activeSource,
  isSelectsDisable,
  activeSourceType,
  participantType,
  sourceParticipantType,
  disableAdd,
  widgetsOfCurrType
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
  // eslint-disable-next-line consistent-return
  const existedSources = useMemo(() => {
    const res = []
    if (sources && sources.length)
      // eslint-disable-next-line consistent-return
      sources.forEach(el => {
        const type = el.type === 'brand' || !el.id ? '' : `(from ${el.type})`
        const countriesLength = el.conditions && el.conditions.country ? el.conditions.country.length : 0
        const languagesLength = el.conditions && el.conditions.language ? el.conditions.language.length : 0
        let resolvedCountry = ''
        let resolvedLanguage = ''

        new Array(countriesLength > languagesLength ? countriesLength : languagesLength)
          .fill(null)
          .forEach((a, index) => {
            let country = ''
            let language = ''

            if (el.conditions.country && el.conditions.country[index]) {
              const countryValue = countries.find(els => els.iso === el.conditions.country[index])
              if (countryValue && countryValue[name]) {
                country = countryValue[name]
              }
            }
            if (el.conditions.language && el.conditions.language[index]) {
              const languageValue = languages.find(els => els.code === el.conditions.language[index])
              if (languageValue && languageValue[name]) {
                language = languageValue[name]
              }
            }

            if (index === 0) {
              resolvedCountry = country
              resolvedLanguage = language
            } else {
              resolvedCountry += country ? `, ${country}` : ''
              resolvedLanguage += language ? `, ${language}` : ''
            }
          })
        resolvedLanguage = resolvedLanguage.replace(',', '').trim() ? resolvedLanguage : 'Any language'
        resolvedCountry = resolvedCountry.replace(',', '').trim() ? resolvedCountry : 'Any country'
        res.push(`${resolvedLanguage}/${resolvedCountry} ${type}`)
      })
    return res.length
      ? res.map(el => {
          return { value: el, id: uuid() }
        })
      : ['Any language / Any country']
  }, [sources, languages, countries, activeSource])

  const sourceImage = useMemo(() => {
    switch (activeSourceType) {
      case 'expert':
        return <img src='/images/Expert.png' alt='expert' />
      case 'brand':
        return <img src='/images/Brand.png' alt='brand' />
      case 'gs1':
        return <img src='/images/Gs1.png' alt='gs1' />
      default:
        return <img src='/images/no-image.png' alt='type' />
    }
  }, [activeSourceType])

  const isIdenticalSourcesPresented = newSources => {
    clearError('sources')
    const newSourcesWithAddedType = JSON.parse(JSON.stringify(newSources))
    // eslint-disable-next-line consistent-return
    const uniqueLocations = uniqWith(newSourcesWithAddedType, (locationA, locationB) => {
      const isTypeEqual = locationA.type === locationB.type
      const isIdPresentedInBothSources = !!(locationA.id && locationB.id)

      const isIdEqual = locationA.id === locationB.id

      if (isEmpty(locationA.conditions) || isEmpty(locationB.conditions)) {
        return isIdPresentedInBothSources
          ? isEqual(
              [locationA.conditions, locationA.type, locationA.id],
              [locationB.conditions, locationB.type, locationB.id]
            )
          : isEqual([locationA.conditions, locationA.type], [locationB.conditions, locationB.type])
      }

      if (!locationA.conditions.country || locationA.conditions.country.length === 0) {
        return isIdPresentedInBothSources
          ? isIdEqual && isTypeEqual && isEqual(locationA.conditions.language, locationB.conditions.language)
          : isTypeEqual && isEqual(locationA.conditions.language, locationB.conditions.language)
      }
      if (!locationA.conditions.language || locationA.conditions.language.length === 0) {
        return isIdPresentedInBothSources
          ? isIdEqual && isTypeEqual && isEqual(locationA.conditions.country, locationB.conditions.country)
          : isTypeEqual && isEqual(locationA.conditions.country, locationB.conditions.country)
      }

      let isCountriesEqual = false
      let isLanguagesEqual = false
      let isIdenticalSource = false

      if (locationA.conditions.country.length === 1 && locationA.conditions.language.length === 1) {
        isIdenticalSource = isIdPresentedInBothSources
          ? isEqual(
              [locationA.conditions, locationA.type, locationA.id],
              [locationB.conditions, locationB.type, locationB.id]
            )
          : isEqual([locationA.conditions, locationA.type], [locationB.conditions, locationB.type])
      }

      if (locationB.conditions.country && locationB.conditions.language) {
        isCountriesEqual = isEqual(locationA.conditions.country, locationB.conditions.country)
        isLanguagesEqual = isEqual(locationA.conditions.language, locationB.conditions.language)
      }
      return isIdPresentedInBothSources
        ? (isCountriesEqual && isLanguagesEqual && isTypeEqual && isIdEqual) || isIdenticalSource
        : (isCountriesEqual && isLanguagesEqual && isTypeEqual) || isIdenticalSource
    })

    if (uniqueLocations.length < newSourcesWithAddedType.length) {
      setError('sources', 'notMatch', intl.get('validation.identicalSource'))
    }
  }

  const addSource = () => {
    const newSources = [...sources]
    newSources.push(
      destroyReferenceDependence({
        conditions: {},
        type: sourceParticipantType,
        data: widgetsOfCurrType || []
      })
    )
    setValue('sources', newSources)
    setValue('activeSource', newSources.length - 1)
    isIdenticalSourcesPresented(newSources)
  }

  const deleteSource = () => {
    const newSources = [...sources]
    newSources.splice(activeSource, 1)
    if (newSources.length === 0) {
      newSources.push({
        conditions: {},
        type: participantType,
        data: []
      })
    }
    setValue('sources', newSources)
    setValue('activeSource', newSources.length - 1)
    clearError('sources')
    isIdenticalSourcesPresented(newSources)
  }

  const copySource = () => {
    const newSources = [...sources]
    const newActiveSource = { conditions: {}, data: newSources[activeSource], type: participantType }
    newSources.push(newActiveSource)
    setValue('sources', newSources)
    setValue('activeSource', newSources.length - 1)
    isIdenticalSourcesPresented(newSources)
  }

  const headerPanel = () => {
    return (
      <HeaderPanel>
        <TypeImage>{sourceImage}</TypeImage>
        <ButtonsPanel>
          <IconButton type='Add' popText='Add source' actionFunction={addSource} visible={!disableAdd} />
          <IconButton
            type='Delete'
            popText='Delete source'
            visible={!isSelectsDisable}
            actionFunction={() => deleteModal(deleteSource, `Are you sure you want to delete this source?`)}
          />
          <IconButton type='Copy' popText='Copy source' visible={!isSelectsDisable} actionFunction={copySource} />
        </ButtonsPanel>
      </HeaderPanel>
    )
  }

  return (
    <ProductEditWidgetWrapper headerText='Source' HeaderPanel={headerPanel}>
      <fieldset name='sources' key='sources'>
        <Form.Item label='Select Source'>
          <Select
            style={{ width: '100%' }}
            loading={false}
            getPopupContainer={trigger => trigger.parentNode}
            value={existedSources && existedSources.map(el => el.value)[activeSource]}
            onChange={value => {
              setValue('activeSource', existedSources.map(el => el.id).indexOf(value))
            }}
            disabled={!isEmpty(errors.sources) || disableAdd}
          >
            {existedSources &&
              existedSources.map(el => {
                return (
                  <Option key={`${el.id}${el.value}`} value={el.id}>
                    {el.value}
                  </Option>
                )
              })}
          </Select>
          <StyledError style={{ visibility: errors.sources ? 'visible' : 'hidden' }}>
            {errors.sources && errors.sources.message}
          </StyledError>
        </Form.Item>
        <Form.Item label={intl.get('serializationTasks.serializationStep.fourthStep.restrictionLanguage')}>
          <Select
            showSearch
            mode='multiple'
            style={{ width: '100%' }}
            loading={isLoadingLanguages}
            optionFilterProp='children'
            getPopupContainer={trigger => trigger.parentNode}
            value={
              languages &&
              languages.length &&
              sources[activeSource] &&
              sources[activeSource].conditions.language &&
              sources[activeSource].conditions.language.map(el =>
                languages.find(elObj => elObj.code === el) ? languages.find(elObj => elObj.code === el)[name] : null
              )
            }
            disabled={isSelectsDisable}
            onChange={values => {
              const newSources = [...sources]
              const newValues = values.map(el => languages.find(language => language[name] === el).code)
              // eslint-disable-next-line no-unused-expressions
              newValues && newValues.length
                ? (newSources[activeSource].conditions.language = newValues)
                : delete newSources[activeSource].conditions.language
              setValue(`sources`, newSources)
              isIdenticalSourcesPresented(newSources)
            }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {languages && !isLoadingLanguages
              ? languages.map(language => (
                  <Option style={{ fontSize: 16 }} key={language.code} value={language[name]}>
                    {language[name]}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item label={intl.get('serializationTasks.serializationStep.fourthStep.restrictionCountry')}>
          <Select
            showSearch
            mode='multiple'
            style={{ width: '100%' }}
            loading={isLoadingCountries}
            optionFilterProp='children'
            getPopupContainer={trigger => trigger.parentNode}
            value={
              countries &&
              countries.length &&
              sources[activeSource] &&
              sources[activeSource].conditions.country &&
              sources[activeSource].conditions.country.map(el =>
                countries.find(elObj => elObj.iso === el) ? countries.find(elObj => elObj.iso === el)[name] : null
              )
            }
            disabled={isSelectsDisable}
            onChange={values => {
              const newSources = [...sources]
              const newValues = values.map(el => countries.find(country => country[name] === el).iso)
              // eslint-disable-next-line no-unused-expressions
              newValues && newValues.length
                ? (newSources[activeSource].conditions.country = newValues)
                : delete newSources[activeSource].conditions.country
              setValue(`sources`, newSources)
              isIdenticalSourcesPresented(newSources)
            }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {countries && !isLoadingCountries
              ? countries.map(country => (
                  <Option style={{ fontSize: 16 }} key={country.iso} value={country[name]}>
                    {country[name]}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
      </fieldset>
    </ProductEditWidgetWrapper>
  )
}

ProductEditSourceWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object).isRequired,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  participantType: PropTypes.string,
  isSelectsDisable: PropTypes.bool,
  activeSourceType: PropTypes.string,
  sourceParticipantType: PropTypes.string,
  disableAdd: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  widgetsOfCurrType: PropTypes.arrayOf(PropTypes.object)
}

ProductEditSourceWidget.defaultProps = {
  errors: {},
  countries: [],
  languages: [],
  sourceParticipantType: null,
  activeSourceType: undefined,
  participantType: null,
  isLoadingLanguages: undefined,
  isLoadingCountries: undefined,
  isSelectsDisable: false,
  disableAdd: false,
  widgetsOfCurrType: null
}

export default ProductEditSourceWidget
