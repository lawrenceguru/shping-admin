import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Checkbox, Form, Input, Select } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import HealthstarSelect from '../../molecules/HealthstarSelect'
import 'image-manipulation'
import {
  IconsWrapper,
  IconWrapper,
  CheckWrapper,
  NameWrapper,
  ValueWrapper,
  LevelWrapper,
  NumberOfFieldsWrapper,
  PerWrapper,
  RatingWrapper,
  UnitWrapper
} from './styles'
import { RATING, ICONS, LEVEL, NUMBER_OF_FIELDS, PER, QUANTITY_UNIT } from './utils'

const { Option } = Select
const ProductEditHealthstarWidget = ({
  setValue,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  register
}) => {
  const [localFieldsNumber, setLocalFieldsNumber] = useState(null)
  const validationFieldValue = (field, value) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].health_star.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].health_star.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const checkFieldsNumber = () => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].health_star.number_of_fields`)
    let checkedIcons = 0
    sources[activeSource].data[widgetIndex].health_star.icons.forEach(el => {
      clearError(`sources[${activeSource}].data[${widgetIndex}].health_star.${el.name}`)
      if (el.check) {
        // eslint-disable-next-line no-plusplus
        checkedIcons++
      }
    })
    if (checkedIcons < localFieldsNumber) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].health_star.number_of_fields`,
        'notMatch',
        `Select ${localFieldsNumber} fields`
      )
    }
  }

  const handleValueOneElementChange = (field, value, name) => {
    const newSources = [...sources]
    let currIndex = newSources[activeSource].data[widgetIndex].health_star.icons.findIndex(el => el.name === name)
    if (currIndex < 0) {
      const emptyElem = ICONS.find(el => el.name === name)
      newSources[activeSource].data[widgetIndex].health_star.icons.push(emptyElem)
      currIndex = newSources[activeSource].data[widgetIndex].health_star.icons.findIndex(el => el.name === name)
    }
    if (currIndex >= 0) {
      newSources[activeSource].data[widgetIndex].health_star.icons[currIndex][field] = value
    }
    if (field === 'value') {
      validationFieldValue(name, value)
    }

    if (field === 'check') {
      checkFieldsNumber()
    }

    if (field === 'check' && !newSources[activeSource].data[widgetIndex].health_star.icons[currIndex].value) {
      validationFieldValue(name, '')
    }
    setValue('sources', newSources)
  }

  useEffect(() => {
    if (data.health_star && data.health_star.icons && data.health_star.icons.length) {
      data.health_star.icons.forEach(el => {
        if (el.check && !el.value) {
          validationFieldValue(el.name, '')
        }
      })
    }
  }, [])

  useEffect(() => {
    checkFieldsNumber()
  }, [])

  useEffect(() => {
    checkFieldsNumber()
  }, [localFieldsNumber])

  const handleValueChange = (field, value) => {
    validationFieldValue(field, value)
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].health_star[field] = value
    setValue('sources', newSources)
    if (field === 'per' && value === 'quantity') {
      handleValueChange('quantity', '')
      handleValueChange('unit', QUANTITY_UNIT[0])
    }
    if (field === 'per' && value === 'pack') {
      clearError(`sources[${activeSource}].data[${widgetIndex}].health_star.quantity`)
    }
  }

  const ifCheckPossible = () => {
    let checkedIcons = 0
    sources[activeSource].data[widgetIndex].health_star.icons.forEach(el => {
      if (el.check) {
        // eslint-disable-next-line no-plusplus
        checkedIcons++
      }
    })
    return checkedIcons < sources[activeSource].data[widgetIndex].health_star.number_of_fields
  }

  const setUnchecked = () => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].health_star.icons.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.check = false
    })
    setValue('sources', newSources)
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.health_star.title')}
      id='healthStarWidgetId'
      HeaderPanel={() => (
        <WidgetHeaderSwitchMode
          setValue={setValue}
          data={data}
          sources={sources}
          activeSource={activeSource}
          widgetIndex={widgetIndex}
          isSelectsDisable={isSelectsDisable}
        />
      )}
    >
      <RatingWrapper>
        <Form.Item label={intl.get('widgets.health_star.rating')}>
          <HealthstarSelect data={data} field='rating' onChangeCallback={handleValueChange} disabled={isSelectsDisable}>
            {RATING.map(elem => (
              <Option style={{ fontSize: 16 }} key={elem} value={elem}>
                {elem}
              </Option>
            ))}
          </HealthstarSelect>
        </Form.Item>
      </RatingWrapper>
      <PerWrapper>
        <Form.Item label={intl.get('widgets.health_star.per')}>
          <HealthstarSelect data={data} field='per' onChangeCallback={handleValueChange} disabled={isSelectsDisable}>
            {PER.map(elem => (
              <Option style={{ fontSize: 16 }} key={elem.value} value={elem.value}>
                {elem.label}
              </Option>
            ))}
          </HealthstarSelect>
        </Form.Item>
        {data && data.health_star && data.health_star.per === 'quantity' && (
          <>
            <Form.Item label={intl.get('widgets.health_star.quantitySize')}>
              <RHFInput
                as={
                  <Input
                    size='large'
                    disabled={isSelectsDisable}
                    type='number'
                    onKeyPress={e => {
                      if (e.key === '-' || e.key === '+') {
                        e.stopPropagation()
                        e.preventDefault()
                      }
                    }}
                  />
                }
                rules={{ required: true }}
                value={data && data.health_star && data.health_star && data.health_star.quantity}
                register={register}
                setValue={setValue}
                onChange={e => {
                  const { value } = e.target
                  handleValueChange('quantity', value)
                }}
              />
              <Error
                errors={errors}
                destination={`sources[${activeSource}].data[${widgetIndex}].health_star.quantity`}
              />
            </Form.Item>
            <Form.Item label={intl.get('widgets.health_star.quantityUnit')}>
              <Select
                showSearch
                style={{ width: '100%' }}
                disabled={isSelectsDisable}
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                getPopupContainer={trigger => trigger.parentNode}
                value={data && data.health_star && data.health_star.unit}
                onChange={value => {
                  handleValueChange('unit', value)
                }}
              >
                {QUANTITY_UNIT.map(elem => (
                  <Option style={{ fontSize: 16 }} key={elem} value={elem}>
                    {elem}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}
      </PerWrapper>
      <NumberOfFieldsWrapper>
        <Form.Item label={intl.get('widgets.health_star.numberOfFields')}>
          <HealthstarSelect
            data={data}
            field='number_of_fields'
            onChangeCallback={(field, value) => {
              setUnchecked()
              handleValueChange(field, value)
              setLocalFieldsNumber(value)
            }}
            disabled={isSelectsDisable}
          >
            {NUMBER_OF_FIELDS.map(elem => (
              <Option style={{ fontSize: 16 }} key={elem} value={elem}>
                {elem}
              </Option>
            ))}
          </HealthstarSelect>
          <Error
            errors={errors}
            destination={`sources[${activeSource}].data[${widgetIndex}].health_star.number_of_fields`}
          />
        </Form.Item>
      </NumberOfFieldsWrapper>
      <IconsWrapper>
        {ICONS.map((elem, i) => {
          const elemWithData = data.health_star.icons.find(icon => icon.name === elem.name)
          return (
            // eslint-disable-next-line react/no-array-index-key
            <IconWrapper key={i}>
              <CheckWrapper>
                <RHFInput
                  as={<Checkbox size='large' disabled={isSelectsDisable} />}
                  checked={data && data.health_star && data.health_star.icons && elemWithData && elemWithData.check}
                  register={register}
                  /* eslint-disable-next-line consistent-return */
                  onChange={e => {
                    if ((e.target.checked && ifCheckPossible()) || !e.target.checked) {
                      handleValueOneElementChange('check', e.target.checked, elem.name)
                    } else {
                      return false
                    }
                  }}
                  setValue={setValue}
                />
              </CheckWrapper>
              <NameWrapper>
                <Form.Item label={intl.get('widgets.health_star.name')}>
                  <RHFInput
                    as={<Input size='large' disabled />}
                    rules={{ required: true }}
                    value={elem.name}
                    register={register}
                    setValue={setValue}
                  />
                </Form.Item>
              </NameWrapper>
              <ValueWrapper>
                <Form.Item label={intl.get('widgets.health_star.value')}>
                  <RHFInput
                    as={
                      <Input
                        size='large'
                        disabled={isSelectsDisable || !elemWithData || !elemWithData.check}
                        type='number'
                        onKeyPress={e => {
                          if (e.key === '-' || e.key === '+') {
                            e.stopPropagation()
                            e.preventDefault()
                          }
                        }}
                      />
                    }
                    rules={{ required: true }}
                    register={register}
                    setValue={setValue}
                    value={data && data.health_star && data.health_star && elemWithData && elemWithData.value}
                    onChange={e => {
                      const { value } = e.target
                      validationFieldValue('value', value)
                      handleValueOneElementChange('value', value, elem.name)
                    }}
                  />
                  <Error
                    errors={errors}
                    destination={`sources[${activeSource}].data[${widgetIndex}].health_star.${elem.name}`}
                  />
                </Form.Item>
              </ValueWrapper>
              <UnitWrapper>
                <Form.Item label={intl.get('widgets.health_star.unit')}>
                  <RHFInput
                    as={<Input size='large' disabled />}
                    rules={{ required: true }}
                    value={elem.unit}
                    register={register}
                    setValue={setValue}
                  />
                </Form.Item>
              </UnitWrapper>
              <LevelWrapper>
                <Form.Item label={intl.get('widgets.health_star.level')}>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    disabled={isSelectsDisable || !elemWithData || !elemWithData.check}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={trigger => trigger.parentNode}
                    value={data && data.health_star && data.health_star && elemWithData && elemWithData.level}
                    onChange={value => {
                      handleValueOneElementChange('level', value, elem.name)
                    }}
                  >
                    {LEVEL.map(level => (
                      <Option style={{ fontSize: 16 }} key={level.value} value={level.value}>
                        {level.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </LevelWrapper>
            </IconWrapper>
          )
        })}
      </IconsWrapper>
    </ProductEditWidgetWrapper>
  )
}

ProductEditHealthstarWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  activeSource: PropTypes.number.isRequired
}

ProductEditHealthstarWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditHealthstarWidget
